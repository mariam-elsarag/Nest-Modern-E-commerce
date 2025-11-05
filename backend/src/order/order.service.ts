import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CartSession } from 'src/cart/entities/cart-session.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { AuthService } from 'src/auth/auth.service';
import { AddressService } from 'src/address/address.service';
import { CartItem } from 'src/cart/entities/cart-items.entity';
import { Variant } from 'src/products/entities/variant.entity';
import { OrderItem } from './entities/order-items.entity';
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from 'src/common/utils/enum';
import { StripeService } from 'src/stripe/stripe.service';
import { ResponseAddressDto } from 'src/address/dto/response-address.dto';
import { Address } from 'src/address/entities/address.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(CartSession)
    private readonly cartSessionRepo: Repository<CartSession>,
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    private readonly authService: AuthService,
    private readonly addressService: AddressService,
    private readonly dataSource: DataSource,
    private readonly stripeService: StripeService,
  ) {}

  /**
   * Create or checkout order
   */
  async checkout(body: CreateOrderDto, user?: User) {
    // (1) Validate guest fields
    if (!user?.id) {
      const missing = Object.entries(body)
        .filter(([_, v]) => !v)
        .map(([k]) => `${k} is required`);
      if (missing.length > 0) {
        throw new BadRequestException({
          message: 'Bad Request',
          errors: missing,
        });
      }
    }

    // (2) Validate cart
    const cart = await this.checkCart(body.cart, body.cartToken, user?.id);

    // (3) Prepare address
    const address = {
      street: body.street ?? '',
      city: body.city ?? '',
      state: body.state ?? '',
      country: body.country ?? '',
      zipCode: body.zipCode ?? '',
    };

    // (4) Ensure user exists or create guest user
    let activeUser = user;
    if (!user?.id) {
      activeUser = await this.authService.createOrReturnUserFromOrder(
        body.email,
        body.fullName,
        address,
      );
    }

    // (5) update address
    const hasAddress =
      address.street || address.city || address.state || address.country;
    let userAddress;
    if (activeUser && hasAddress) {
      userAddress = await this.addressService.createOrUpdateAddress(
        address,
        activeUser,
      );
    } else {
      userAddress = activeUser?.address;
    }

    // (6) validate cart stock
    const reservedVariants = await this.validateCartVariant(cart.items);

    // totla price
    const totalPrice = cart.items.reduce((sum, item) => {
      const price = Number(item.variant.price) * item.quantity;
      return sum + price;
    }, 0);

    // (7) Create order + order items inside a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // --- Create order ---
      const order = queryRunner.manager.create(Order, {
        user: activeUser,
        address: userAddress,
        totalPrice,
        paymentMethod: body.paymentMethod,
        paymentStatus: PaymentStatus.Pending,
        status: OrderStatus.Pending,
      });

      await queryRunner.manager.save(order);

      // --- Create order items ---
      for (const item of cart.items) {
        const orderItem = queryRunner.manager.create(OrderItem, {
          order,
          variant: item.variant,
          product: item.variant.product,
          quantity: item.quantity,
          price: Number(item.variant.price),
        });
        await queryRunner.manager.save(orderItem);

        // Update variant stock
        const variant = reservedVariants.find((v) => v.id === item.variant.id);
        if (variant) {
          variant.quantity -= item.quantity;
          variant.reserved -= item.quantity;
          await queryRunner.manager.save(variant);
        }
      }
      let checkoutUrl: string | null = null;
      if (body.paymentMethod === PaymentMethod.Gateway) {
        const stripeSession = await this.stripeService.createCheckoutSession(
          cart.items.map((i) => ({
            title: i.variant.product?.title ?? `Product #${i.variant.id}`,
            cover: i.variant.product?.cover ?? '',
            price: Number(i.variant.price),
            quantity: i.quantity,
          })),
          order.id,
        );

        // Save transactionId in order
        order.transactionId = stripeSession.id;
        await queryRunner.manager.save(order);

        checkoutUrl = stripeSession.url;
      }
      // --- Clear cart ---
      await queryRunner.manager.delete(CartSession, { id: cart.id });

      await queryRunner.commitTransaction();

      return {
        message: 'Order created successfully',
        checkoutUrl,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Order transaction failed:', error);
      throw new BadRequestException('Failed to create order');
    } finally {
      await queryRunner.release();
    }
  }

  private async checkCart(cartId: number, token?: string, userId?: number) {
    if (!token && !userId) {
      throw new UnauthorizedException('User or token required');
    }

    const where: any[] = [];
    if (userId) where.push({ id: cartId, userId });
    if (token) where.push({ id: cartId, cartToken: token });

    const cartSession = await this.cartSessionRepo.findOne({
      where,
      relations: ['items', 'items.variant', 'items.variant.product'],
    });

    if (!cartSession) {
      throw new BadRequestException('Cart not found');
    }

    return cartSession;
  }

  private async validateCartVariant(cartItems: CartItem[]) {
    const updatedVariants: Variant[] = [];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const item of cartItems) {
        const variant = await queryRunner.manager
          .createQueryBuilder(Variant, 'variant')
          .setLock('pessimistic_write')
          .where('variant.id = :id', { id: item.variant.id })
          .getOne();

        if (!variant) {
          throw new BadRequestException(
            `Variant ${item.variant.id} not found.`,
          );
        }

        if (variant.quantity < item.quantity) {
          throw new BadRequestException(
            `Variant ${variant.id} not available in sufficient quantity.`,
          );
        }

        // Update reserved stock
        variant.reserved += item.quantity;
        await queryRunner.manager.save(variant);

        updatedVariants.push(variant);
      }

      await queryRunner.commitTransaction();
      return updatedVariants;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
