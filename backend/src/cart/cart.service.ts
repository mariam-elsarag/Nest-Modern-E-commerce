import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { CartSession } from './entities/cart-session.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-items.entity';
import { JwtPayload } from 'src/common/utils/types';
import { ProductsAdminService } from 'src/products/providers/products-admin.service';
import { plainToInstance } from 'class-transformer';
import { CartResponseDto } from './dto/response-cart.dto';
import { Request, Response } from 'express';
import { QueryCartDto } from './dto/query-cart.dto';
import { ResponseCartDetailsDto } from './dto/response-cart_detials.dto';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartSession)
    private readonly cartSessionRepo: Repository<CartSession>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,

    private readonly productAdminService: ProductsAdminService,
  ) {}

  async createOrAddToCart(
    createCartDto: CreateCartDto,
    user: JwtPayload,
    res: Response,
  ) {
    const { cartToken, product: productId, variant, quantity } = createCartDto;
    const { id } = user;

    const cartSession = await this.findOrCreateSession(cartToken, id);

    const product = await this.productAdminService.findAvalibleOne(productId);
    const productVariant = await this.productAdminService.checkVariant(
      product,
      variant,
      quantity,
    );

    const vatRate = product.hasTax ? product?.taxRate : 0;
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

    if (!cartSession?.id) {
      const sessionToken = user ? null : uuidv4();

      cartSession = this.cartSessionRepo.create({
        userId: user ?? null,
        cartToken: sessionToken,
      });
      console.log(cartSession, 'sk');
      cartSession = await this.cartSessionRepo.save(cartSession);
    }

    return cartSession;
  }
}
