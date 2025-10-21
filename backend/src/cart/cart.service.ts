import { Injectable } from '@nestjs/common';
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
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartSession)
    private readonly cartSessionRepo: Repository<CartSession>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,

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

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }

  async findOrCreateSession(token?: string, user?: number) {
    let cartSession: CartSession | null = null;

    if (user) {
      cartSession = await this.cartSessionRepo.findOne({
        where: { userId: user },
      });
    } else if (token) {
      cartSession = await this.cartSessionRepo.findOne({
        where: { cartToken: token },
      });
    }

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
