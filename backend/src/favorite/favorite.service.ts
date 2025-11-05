import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/common/utils/types';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { ProductsAdminService } from 'src/products/providers/products-admin.service';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { FavoriteResponesDto } from './dto/response-favorite.dto';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepo: Repository<Favorite>,
    private readonly productAdminService: ProductsAdminService,
    private readonly cartService: CartService,
  ) {}
  async findOne(userId: number, productId: number) {
    const existing = await this.favoriteRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    return existing;
  }

  async findAll(query: PaginationQueryDto, req: Request, user: User) {
    const { search, page = '1', limit = '10' } = query;
    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;

    const qb = this.favoriteRepo
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.product', 'product');

    if (search) {
      qb.andWhere(
        '(product.title ILIKE :search OR product.title_ar ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [results, count] = await qb
      .orderBy('favorite.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    // to check if this product in a cart
    const cart = await this.cartService.findSession(undefined, user.id);

    const data = results.map((product) => {
      const matchedItem = cart?.items.find(
        (item) => item.product.id === product.id,
      );
      const item = {
        ...product,
        cartId: matchedItem ? matchedItem.id : null,
        isCart: !!matchedItem,
      };
      return plainToInstance(FavoriteResponesDto, item, {
        excludeExtraneousValues: true,
      });
    });

    return new FullPaginationDto(currentPage, count, take, req, data);
  }

  async update(id: number, user: User) {
    const { id: userId } = user;
    // check if proudct exist
    const product = await this.productAdminService.findOne(id);

    const existing = await this.findOne(userId, product.id);

    if (existing) {
      await this.favoriteRepo.remove(existing);
      return { isFavorite: false };
    } else {
      const favorite = this.favoriteRepo.create({
        user: user,
        product: product,
      });
      await this.favoriteRepo.save(favorite);
      return { isFavorite: true };
    }
  }
}
