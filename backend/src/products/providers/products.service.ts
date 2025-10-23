import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { HiglightProductsQueryDto } from '../dto/query-product.dto';
import { JwtPayload } from 'src/common/utils/types';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { plainToInstance } from 'class-transformer';
import { PlateformProductDto } from '../dto/plateform-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,

    private readonly cartService: CartService,
  ) {}

  async highlights(query: HiglightProductsQueryDto, user: User) {
    const { type = 'latest', cartToken } = query;

    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .where('product.isAvalible = :isAvalible', { isAvalible: true })
      .andWhere('variants.quantity > 0');

    if (type === 'latest') {
      qb.addOrderBy('product.createdAt', 'DESC');
    } else if (type === 'featured') {
      qb.andWhere('product.isFeatured = :isFeatured', { isFeatured: true });
    }

    const products = await qb.getMany();

    let favoriteProductIds: number[] = [];
    if (user?.id) {
      const favorites = await this.favoriteRepository.find({
        where: { user: { id: user.id } },
        relations: ['product'],
      });
      favoriteProductIds = favorites.map((fav) => fav.product.id);
    }

    const cartSession = await this.cartService.findSession(cartToken, user?.id);
    const cartProductIds =
      cartSession?.items?.map((item) => item.product.id) ?? [];

    const productsList = products.map((product) => {
      const item = {
        ...product,
        isFavorite: favoriteProductIds.includes(product.id),
        isCart: cartProductIds.includes(product.id),
      };
      return plainToInstance(PlateformProductDto, item, {
        excludeExtraneousValues: true,
      });
    });

    return productsList;
  }
}
