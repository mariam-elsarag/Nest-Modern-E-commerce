import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CategoryService } from 'src/category/category.service';
import { Request } from 'express';
import { QueryProductDto } from '../dto/query-product.dto';
import { plainToInstance } from 'class-transformer';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';
import { ProductResponseDto } from '../dto/admin/response-product.dto';
import { Variant } from '../entities/variant.entity';
import { CartItem } from 'src/cart/entities/cart-items.entity';
import { SettingsService } from 'src/settings/settings.service';
import { CreateProductDto } from '../dto/admin/create-product.dto';
import { UpdateProductDto } from '../dto/admin/update-product.dto';
import { ProductListResponseDto } from '../dto/admin/response-product-list.dto';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class ProductsAdminService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(CartItem)
    private readonly cartItemReop: Repository<CartItem>,
    @InjectRepository(Favorite)
    private readonly favoriteRepo: Repository<Favorite>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly colorServices: ColorsService,
    private readonly sizeService: SizesService,
    private readonly categoryService: CategoryService,
    private readonly settingService: SettingsService,
  ) {}

  /**
   * create cart from admin
   * @param createProductDto
   * @param files
   * @returns
   */
  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const { variants, categories, defaultTax, taxRate, ...rest } =
      createProductDto;

    if (!files?.length) {
      throw new BadRequestException('No files uploaded');
    }

    const coverFile = files.find((f) => f.fieldname === 'cover');

    let coverImage;
    if (coverFile) {
      this.cloudinaryService.validateFileType(coverFile, 'image');
      coverImage = await this.cloudinaryService.uploadImage(
        coverFile,
        'product/cover',
      );
    }
    const imagesFiles = files.reduce(
      (acc, file) => {
        const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
        if (match) {
          const index = parseInt(match[1]);
          if (!acc[index]) acc[index] = [];
          acc[index].push(file);
        }
        return acc;
      },
      {} as Record<number, Express.Multer.File[]>,
    );

    const imagesUpload: Record<number, string[]> = {};

    await Promise.all(
      Object.entries(imagesFiles).map(async ([index, files]) => {
        if (files.length > 0) {
          this.cloudinaryService.validateFiles(files, 'image');
          const uploaded = await this.cloudinaryService.uploadMany(
            files,
            'products/images',
          );
          imagesUpload[Number(index)] = uploaded;
        }
      }),
    );

    //  Check  category exists
    const categoryEntity = await this.categoryService.checkCategoryExists({
      categories,
    });

    //  Validate color - size
    await Promise.all(
      variants.map(async (v) => {
        await Promise.all([
          v.size ? this.sizeService.findOne(v.size) : null,
          this.colorServices.findOne(v.color),
        ]);
      }),
    );
    let tax = taxRate ?? 0;
    if (defaultTax) {
      const setting = await this.settingService.findOne();
      tax = setting.taxRate ?? 0;
    }
    const savedProduct = await this.productRepository.save({
      ...rest,
      taxRate: tax,
      defaultTax: defaultTax,
      categories: categoryEntity,
      cover: coverImage,
    });

    console.log(variants, 'variant');
    const resolvedVariants = variants.map((v, i) => ({
      ...v,
      product: savedProduct,
      color: { id: v.color },
      size: v.size ? { id: v.size } : undefined,
      images: imagesUpload[i] || [],
      discountPercent: v.discountPercent,
    }));

    await this.variantRepository.save(resolvedVariants);
    const product = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['categories', 'variants'],
    });

    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Get all product list
   * @param query
   * @param req
   * @returns
   */
  async findAll(query: QueryProductDto, req: Request) {
    const { search, category, limit = '10', page = '1' } = query;

    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;

    const qb = this.productRepository
      .createQueryBuilder('product')
      .withDeleted()
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.variants', 'variant');

    if (search) {
      qb.andWhere(
        '(product.title ILIKE :search OR product.title_ar ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      qb.andWhere('category.id IN (:category)', { category });
    }

    const [results, count] = await qb
      .orderBy('product.deletedAt', 'ASC', 'NULLS FIRST')
      .addOrderBy('product.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const data = results.map((product) =>
      plainToInstance(ProductListResponseDto, product, {
        excludeExtraneousValues: true,
      }),
    );

    return new FullPaginationDto(currentPage, count, take, req, data);
  }

  /**
   *
   * @param id
   * @returns
   */
  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories', 'variants'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  async findAvalibleOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id, isAvalible: true },
      relations: ['variants'],
    });

    if (!product) {
      throw new NotFoundException('Product not found or unavailable');
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const { categories, variants, taxRate, defaultTax, ...rest } =
      updateProductDto;
    const product = await this.findOne(id);

    //  cover img update
    let coverUrl = product.cover;
    const coverFile = files.find((f) => f.fieldname === 'cover');
    if (coverFile) {
      this.cloudinaryService.validateFileType(coverFile, 'image');
      const oldPicId = this.cloudinaryService.extractPublicIdFromUrl(
        product.cover,
      );
      coverUrl = await this.cloudinaryService.updateImage(
        oldPicId,
        coverFile,
        'products/covers',
      );
    }

    // --- variant images
    const imagesFiles = files.reduce(
      (acc, file) => {
        const match = file.fieldname.match(
          /variants\[(\d+)\]\[images\](?:\[\d+\])?/,
        );
        if (match) {
          const index = parseInt(match[1]);
          if (!acc[index]) acc[index] = [];
          acc[index].push(file);
        }
        return acc;
      },
      {} as Record<number, Express.Multer.File[]>,
    );

    const imagesUpload: Record<number, string[]> = {};

    await Promise.all(
      Object.entries(imagesFiles).map(async ([index, files]) => {
        if (files.length > 0) {
          this.cloudinaryService.validateFiles(files, 'image');
          const uploaded = await this.cloudinaryService.uploadMany(
            files,
            'products/images',
          );
          imagesUpload[Number(index)] = uploaded;
        }
      }),
    );

    // --- Category and tax
    let categoryEntity = product.categories;
    if (categories?.length) {
      categoryEntity = await this.categoryService.checkCategoryExists({
        categories,
      });
    }

    let tax = taxRate ?? 0;
    if (defaultTax) {
      const setting = await this.settingService.findOne();
      tax = setting.taxRate ?? 0;
    }

    // --- Update main product
    await this.productRepository.save({
      ...product,
      ...rest,
      taxRate: tax,
      defaultTax,
      cover: coverUrl,
      categories: categoryEntity,
    });

    // --- Handle variants
    if (variants) {
      const incomingVariantIds = variants.filter((v) => v.id).map((v) => v.id);
      const variantsToRemove = product.variants?.filter(
        (pv) => !incomingVariantIds.includes(pv.id),
      );

      // remove deleted variant
      if (variantsToRemove?.length) {
        const ids = variantsToRemove.map((v) => v.id);
        if (ids?.length > 0) {
          await this.variantRepository.softDelete({ id: In(ids) });
          await this.favoriteRepo.delete({ variant: In(ids) });
          await this.cartItemReop.update(
            { variant: In(ids) },
            { isValid: false },
          );
        }
      }

      //  create or update  variant
      for (const [i, v] of variants.entries()) {
        const [size, color] = await Promise.all([
          v.size ? this.sizeService.findOne(v.size) : null,
          v.color ? this.colorServices.findOne(v.color) : null,
        ]);

        if (!v.id) {
          // New one
          if (v.price == null || v.quantity == null || !color) {
            throw new BadRequestException(
              'Each new variant must include price, quantity, and color.',
            );
          }
          await this.variantRepository.save({
            price: v.price,
            quantity: v.quantity,
            product,
            size: size ? { id: size.id } : undefined,
            color: color ? { id: color.id } : undefined,
            images: imagesUpload[i] || [],
            discountPercent: v.discountPercent ?? 0,
          });
        } else {
          // update data of existing variant
          const existingVariant = await this.variantRepository.findOneBy({
            id: v.id,
          });
          if (existingVariant) {
            await this.variantRepository.save({
              ...existingVariant,
              price: v.price ?? existingVariant.price,
              discountPercent:
                v.discountPercent ?? existingVariant.discountPercent,
              quantity: v.quantity ?? existingVariant.quantity,
              size: size ? { id: size.id } : existingVariant.size,
              color: color ? { id: color.id } : existingVariant.color,
              images: imagesUpload[i]?.length
                ? imagesUpload[i]
                : existingVariant.images,
            });
          }
        }
      }
    }

    const savedProduct = await this.findOne(product.id);
    return plainToInstance(ProductResponseDto, savedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    const variantIds = product.variants?.map((v) => v.id) || [];

    await this.productRepository.softDelete(id);

    if (variantIds.length > 0) {
      await this.variantRepository.softDelete({ id: In(variantIds) });
    }
    await this.cartItemReop.update({ product }, { isValid: false });

    return `Product has been deleted successfully`;
  }

  async restore(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.restore(id);
    const variantIds = product.variants?.map((v) => v.id) || [];
    await this.variantRepository.restore({ id: In(variantIds) });

    return { message: 'Product has been restored successfully' };
  }

  async getAvailableProducts() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variants')
      .where('product.isAvailable = :available', { available: true })
      .andWhere('variants.quantity > 0')
      .getMany();

    return products;
  }

  async checkVariant(variantId: number, quantity: number) {
    const variant = await this.variantRepository.findOne({
      where: { id: variantId },
      relations: ['product'],
    });
    if (!variant?.product.isAvalible) {
      throw new NotFoundException('Product not found or unavailable');
    }
    if (!variant) {
      throw new BadRequestException('Variant not found for this product');
    }

    if (variant.quantity <= 0) {
      throw new BadRequestException('This variant is out of stock');
    }

    if (variant.quantity < quantity) {
      throw new BadRequestException(
        `Insufficient stock: only ${variant.quantity} available`,
      );
    }

    return variant;
  }
}
