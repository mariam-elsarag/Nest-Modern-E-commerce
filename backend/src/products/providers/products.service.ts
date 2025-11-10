import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import {
  FilterProductQueryDto,
  HiglightProductsQueryDto,
} from '../dto/query-product.dto';
import { JwtPayload } from 'src/common/utils/types';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { plainToInstance } from 'class-transformer';
import {
  PlateformProductDetailsDto,
  PlateformProductDto,
} from '../dto/plateform/plateform-product.dto';
import { Variant } from '../entities/variant.entity';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';
import { SizeResponseDto } from 'src/sizes/dto/response-size.dto';
import { Request } from 'express';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    private readonly cartService: CartService,
  ) {}

  async highlights(query: HiglightProductsQueryDto, user: User) {
    const { type = 'latest', cartToken } = query;

    const qb = this.variantRepo
      .createQueryBuilder('variant')
      .leftJoinAndSelect('variant.product', 'product')
      .where('product.isAvalible = :isAvalible', { isAvalible: true })
      .andWhere('variant.quantity > 0')
      .take(4);

    if (type === 'latest') {
      qb.addOrderBy('product.createdAt', 'DESC');
    } else if (type === 'featured') {
      qb.andWhere('product.isFeatured = :isFeatured', { isFeatured: true });
    }

    const products = await qb.getMany();

    const productsList = await this.addFlagsToProduct(
      products,
      user,
      cartToken,
    );

    return productsList;
  }

  async products(query: FilterProductQueryDto, req: Request, user: User) {
    const {
      search,
      page = '1',
      limit = '10',
      categories,
      color,
      size,
      minPrice,
      maxPrice,
      cartToken,
    } = query;

    const currentPage = +page;
    const take = +limit;
    const skip = (currentPage - 1) * take;
    const categoryIds = categories ? categories.split(',').map(Number) : [];

    const qb = this.variantRepo
      .createQueryBuilder('variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('variant.color', 'color')
      .leftJoinAndSelect('variant.size', 'size')
      .where('product.isAvalible = :isAvalible', { isAvalible: true })
      .andWhere('variant.quantity > 0');

    if (search) {
      qb.andWhere(
        '(product.title ILIKE :search OR product.title_ar ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (categoryIds.length > 0) {
      qb.andWhere('category.id IN (:...categoryIds)', { categoryIds });
    }

    if (size) {
      qb.andWhere('variant.size = :size', { size });
    }

    if (color) {
      qb.andWhere('variant.color = :color', { color });
    }

    if (minPrice) {
      qb.andWhere('variant.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      qb.andWhere('variant.price <= :maxPrice', { maxPrice });
    }

    const [results, count] = await qb
      .orderBy('product.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const products = await this.addFlagsToProduct(results, user, cartToken);

    return new FullPaginationDto(currentPage, count, take, req, products);
  }

  async findOne(id: number, user: User) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return plainToInstance(PlateformProductDetailsDto, product, {
      excludeExtraneousValues: true,
    });
  }
  async similarProduct(id: number, user: User) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const productCategories = product.categories.map(({ id }) => id);

    const productsWithCategory = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.variants', 'variant')
      .where('category.id IN(:...productCategories)', { productCategories })
      .andWhere('variant.quantity > 0')
      .andWhere('product.id != :id', { id })
      .distinct(true)
      .take(4)
      .getMany();
    const products = await this.addFlagsToProduct(productsWithCategory, user);
    return plainToInstance(PlateformProductDto, products, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Return only used color in products
   * @returns colors
   */
  async productsColor() {
    const colors = await this.variantRepo
      .createQueryBuilder('variant')
      .innerJoin('variant.color', 'color')
      .select([
        'DISTINCT color.id AS id',
        'color.name AS name',
        'color.name_ar AS name_ar',
        'color.color AS color',
      ])
      .getRawMany();

    return colors.map((c) =>
      plainToInstance(ColorResponseDto, c, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async productUsedSizes() {
    const sizes = await this.variantRepo
      .createQueryBuilder('variant')
      .innerJoinAndSelect('variant.size', 'size')
      .select(['DISTINCT size.id AS id', 'size.label AS label'])
      .getRawMany();

    return sizes.map((s) =>
      plainToInstance(SizeResponseDto, s, { excludeExtraneousValues: true }),
    );
  }

  async addFlagsToProduct(products: any[], user: User, cartToken?: string) {
    let favoriteProductIds = new Set<number>();
    if (user?.id) {
      const favorites = await this.favoriteRepository.find({
        where: { user: { id: user.id } },
        relations: ['variant'],
      });
      console.log(favorites, 'test fav');
      favoriteProductIds = new Set(favorites.map((fav) => fav.variant.id));
    }

    const cartSession = await this.cartService.findSession(cartToken, user?.id);
    const cartItems = cartSession?.items ?? [];

    const cartVariantMap = new Map<number, number>();
    for (const item of cartItems) {
      cartVariantMap.set(item.variant.id, item.id);
    }

    const productsList = products.map((product) => {
      const variantId = product.id;

      const matchedVariantId = cartVariantMap.has(variantId);

      const item = {
        ...product,
        isFavorite: favoriteProductIds.has(product.id),
        isCart: !!matchedVariantId,
        cartItemId: matchedVariantId ? cartVariantMap.get(variantId) : null,
      };

      return plainToInstance(PlateformProductDto, item, {
        excludeExtraneousValues: true,
      });
    });

    return productsList;
  }
}
