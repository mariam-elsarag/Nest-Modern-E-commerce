import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { CartSession } from './entities/cart-session.entity';
import { In, Repository } from 'typeorm';
import { CartItem } from './entities/cart-items.entity';
import { InvalidCartItemType, JwtPayload } from 'src/common/utils/types';
import { ProductsAdminService } from 'src/products/providers/products-admin.service';
import { plainToInstance } from 'class-transformer';
import { CartResponseDto } from './dto/response-cart.dto';
import { Request, Response } from 'express';
import { QueryCartDto } from './dto/query-cart.dto';
import { ResponseCartDetailsDto } from './dto/response-cart_detials.dto';
import { Variant } from 'src/products/entities/variant.entity';
import { error } from 'console';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartSession)
    private readonly cartSessionRepo: Repository<CartSession>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,

    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,

    private readonly productAdminService: ProductsAdminService,
  ) {}

  async createOrAddToCart(
    createCartDto: CreateCartDto,
    user: JwtPayload,
    res: Response,
  ) {
    const { cartToken, variant, quantity } = createCartDto;
    const { id } = user;

    const cartSession = await this.findOrCreateSession(cartToken, id);

    const productVariant = await this.productAdminService.checkVariant(
      variant,
      quantity,
    );

    const vatRate = productVariant.product.hasTax
      ? productVariant.product.taxRate
      : 0;
    const existingItem = await this.cartItemRepo.findOne({
      where: {
        session: { id: cartSession.id },
        variant: { id: productVariant.id },
      },
    });

    let cart;
    if (existingItem) {
      existingItem.quantity = quantity;
      cart = await this.cartItemRepo.save(existingItem);
    } else {
      const cartItem = this.cartItemRepo.create({
        session: cartSession,
        product: productVariant.product,
        variant: productVariant,
        quantity,
        price: productVariant.price,
        vatRate,
      });
      cart = await this.cartItemRepo.save(cartItem);
    }
    // const cart = await this.cartSessionRepo.findOne({
    //   where: { id: cartSession.id },
    //   relations: ['items', 'items.product', 'items.variant'],
    // });

    if (cartSession?.cartToken) {
      res.cookie('cart_token', cartSession.cartToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    const items = plainToInstance(CartResponseDto, cart, {
      excludeExtraneousValues: true,
    });

    return res.json({
      cartToken: cartSession.cartToken,
      items,
    });
  }

  async cartDetails(query: QueryCartDto, user: JwtPayload) {
    const { id } = user;
    const { cartToken } = query;
    const cart = await this.findSession(cartToken, id);
    if (!cart) return [];

    return plainToInstance(ResponseCartDetailsDto, cart, {
      excludeExtraneousValues: true,
    });
  }

  async validateCartForCheckout(query: QueryCartDto, user: JwtPayload) {
    const { id } = user;
    const { cartToken } = query;

    // 1 check cart exist
    const cart = await this.findSession(cartToken, id);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    if (cart.expiresAt && new Date() > cart.expiresAt) {
      throw new BadRequestException('Cart expired');
    }
    // 2 check variant exist in db and their products are avalible
    const invalidItems: InvalidCartItemType[] = [];
    const validItems: number[] = [];
    const variantIds = cart.items.map(({ variant }) => variant.id);

    const variants = await this.variantRepo.find({
      where: { id: In(variantIds) },
      relations: ['product'],
    });

    const variantMap = new Map(variants.map((v) => [v.id, v]));
    for (const variantItem of cart.items) {
      const v = variantMap.get(variantItem.variant.id);
      if (!variantItem.isValid) {
        invalidItems.push({
          type: 'variant_deleted',
          variantId: variantItem.variant.id,
        });
        continue;
      }

      if (!v) {
        invalidItems.push({
          type: 'variant_deleted',
          variantId: variantItem.variant.id,
        });
        continue;
      }

      if (!v.product.isAvalible) {
        invalidItems.push({
          type: 'product_unavailable',
          variantId: variantItem.variant.id,
        });
        continue;
      }

      const avalibleVariant = v.quantity - v.reserved;
      if (avalibleVariant < variantItem.quantity) {
        invalidItems.push({
          type: 'quantity_not_available',
          variantId: variantItem.variant.id,
          available: avalibleVariant,
          productTitle: variantItem.product.title,
          productTitleAr: variantItem.product.title_ar,
        });
        continue;
      }

      validItems.push(variantItem.variant.id);
    }

    if (invalidItems.length > 0) {
      throw new BadRequestException({
        message: 'Invalid cart items',
        error: { variants: invalidItems },
      });
    }
    return { message: 'Successfully proceed to checkout' };
  }

  async remove(id: number, query: QueryCartDto, user: JwtPayload) {
    const { cartToken } = query;

    const cart = await this.findSession(cartToken, user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.cartItemRepo.findOne({
      where: { id },
      relations: ['session'],
    });
    if (!cartItem) {
      throw new NotFoundException('Item not found');
    }

    if (cartItem.session.id !== cart.id) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action.',
      );
    }

    await this.cartItemRepo.delete(id);

    const remainingItems = await this.cartItemRepo.count({
      where: { session: { id: cart.id } },
    });

    if (remainingItems === 0) {
      await this.cartSessionRepo.delete({ id: cart.id });
    }

    return `This action removes a #${id} cart item`;
  }

  async findSession(token?: string, user?: number) {
    const where: any = {};

    if (user) {
      where.userId = user;
    } else if (token) {
      where.cartToken = token;
    }
    if (user || token) {
      const cartSession = await this.cartSessionRepo.findOne({
        where,
        relations: ['items', 'items.variant'],
        withDeleted: true,
      });

      return cartSession;
    } else {
      return null;
    }
  }
  async findOrCreateSession(token?: string, user?: number) {
    let cartSession = await this.findSession(token, user);

    if (cartSession?.expiresAt && cartSession.expiresAt < new Date()) {
      await this.cartSessionRepo.remove(cartSession);
      cartSession = null;
    }

    if (!cartSession?.id) {
      const sessionToken = user ? null : uuidv4();

      cartSession = this.cartSessionRepo.create({
        userId: user ?? null,
        cartToken: sessionToken,
        expiresAt: this.generateExpiryDate(),
      });

      cartSession = await this.cartSessionRepo.save(cartSession);
    }

    return cartSession;
  }

  private generateExpiryDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }
}
