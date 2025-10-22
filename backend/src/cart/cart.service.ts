import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { CartSession } from './entities/cart-session.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-items.entity';
import { JwtPayload } from 'src/common/utils/types';
import { ProductsService } from 'src/products/products.service';
import { plainToInstance } from 'class-transformer';
import { CartResponseDto } from './dto/response-cart.dto';
import { Request, Response } from 'express';
import { QueryCartDto } from './dto/query-cart.dto';
import { SettingsService } from 'src/settings/settings.service';
import { ResponseCartDetailsDto } from './dto/response-cart_detials.dto';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartSession)
    private readonly cartSessionRepo: Repository<CartSession>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    private readonly settingService: SettingsService,
    private readonly productService: ProductsService,
  ) {}

  async createOrAddToCart(
    createCartDto: CreateCartDto,
    user: JwtPayload,
    res: Response,
  ) {
    const { cartToken, product: productId, variant, quantity } = createCartDto;
    const { id } = user;
    const cartSession = await this.findOrCreateSession(cartToken, id);

    const product = await this.productService.findAvalibleOne(productId);
    const productVariant = await this.productService.checkVariant(
      product,
      variant,
      quantity,
    );
    const setting = await this.settingService.findOne();
    const vatRate = product.hasTax
      ? product?.defaultTax
        ? setting.taxRate
        : product.taxRate
      : 0;
    const existingItem = await this.cartItemRepo.findOne({
      where: {
        session: { id: cartSession.id },
        product: { id: productId },
        variant: { id: productVariant.id },
      },
    });

    if (existingItem) {
      existingItem.quantity = quantity;
      await this.cartItemRepo.save(existingItem);
    } else {
      const cartItem = this.cartItemRepo.create({
        session: cartSession,
        product,
        variant: productVariant,
        quantity,
        price: productVariant.price,
        vatRate,
      });
      await this.cartItemRepo.save(cartItem);
    }
    const cart = await this.cartSessionRepo.findOne({
      where: { id: cartSession.id },
      relations: ['items', 'items.product', 'items.variant'],
    });

    if (cartSession?.cartToken) {
      res.cookie('cart_token', cartSession.cartToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    const items = plainToInstance(CartResponseDto, cart?.items, {
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
    let cartSession: CartSession | null = null;

    if (user) {
      cartSession = await this.cartSessionRepo.findOne({
        where: { userId: user },
        relations: ['items', 'items.product', 'items.variant'],
        withDeleted: true,
      });
    } else if (token) {
      cartSession = await this.cartSessionRepo.findOne({
        where: { cartToken: token },
        relations: ['items', 'items.product', 'items.variant'],
        withDeleted: true,
      });
    }

    return cartSession;
  }
  async findOrCreateSession(token?: string, user?: number) {
    let cartSession = await this.findSession(token, user);
    if (!cartSession) {
      const sessionToken = user ? null : uuidv4();

      cartSession = this.cartSessionRepo.create({
        userId: user ?? null,
        cartToken: sessionToken,
      });

      cartSession = await this.cartSessionRepo.save(cartSession);
    }

    return cartSession;
  }
}
