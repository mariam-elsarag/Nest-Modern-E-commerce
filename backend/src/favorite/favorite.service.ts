import { BadRequestException, Injectable } from '@nestjs/common';
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
import { Variant } from 'src/products/entities/variant.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepo: Repository<Favorite>,
    private readonly productAdminService: ProductsAdminService,
    private readonly cartService: CartService,
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
  ) {}
  async findOne(userId: number, variantId: number) {
    const existing = await this.favoriteRepo.findOne({
      where: { user: { id: userId }, variant: { id: variantId } },
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
      .leftJoinAndSelect('favorite.variant', 'variant')
      .leftJoinAndSelect('variant.product', 'product');

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

    // to check if this variant in a cart
    const cart = await this.cartService.findSession(undefined, user.id);

    const data = results.map((product) => {
      const matchedItem = cart?.items.find(
        (item) => item.variant.id === product.variant.id,
      );

      const item = {
        ...product,
        cartItemId: matchedItem ? matchedItem.id : null,
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
    const variant = await this.variantRepo.findOne({ where: { id } });
    if (!variant) {
      throw new BadRequestException('Product not found');
    }

    const existing = await this.findOne(userId, variant.id);

    if (existing) {
      await this.favoriteRepo.remove(existing);
      return { isFavorite: false };
    } else {
      const favorite = this.favoriteRepo.create({
        user: user,
        variant,
      });
      await this.favoriteRepo.save(favorite);
      return { isFavorite: true };
    }
  }
}
