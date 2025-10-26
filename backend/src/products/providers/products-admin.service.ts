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

@Injectable()
export class ProductsAdminService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(CartItem)
    private readonly cartItemReop: Repository<CartItem>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly colorServices: ColorsService,
    private readonly sizeService: SizesService,
    private readonly categoryService: CategoryService,
    private readonly settingService: SettingsService,
  ) {}

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
    const imagesFiles = files.filter((f) => f.fieldname === 'images');

    let coverUpload;
    if (coverFile) {
      this.cloudinaryService.validateFileType(coverFile, 'image');
      coverUpload = await this.cloudinaryService.uploadImage(
        coverFile,
        'products/covers',
      );
    }

    let imagesUpload;
    if (imagesFiles?.length) {
      this.cloudinaryService.validateFiles(imagesFiles, 'image');
      imagesUpload = await this.cloudinaryService.uploadMany(
        imagesFiles,
        'products/images',
      );
    }

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
      cover: coverUpload,
      images: imagesUpload,
    });

    const resolvedVariants = variants.map((v) => ({
      ...v,
      product: savedProduct,
      color: { id: v.color },
      size: v.size ? { id: v.size } : undefined,
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
    const { images, categories, variants, taxRate, defaultTax, ...rest } =
      updateProductDto;
    const product = await this.findOne(id);

    const coverFile = files.find((f) => f.fieldname === 'cover');
    const imagesFiles = files.filter((f) => f.fieldname === 'images');

    //  cover
    let coverUrl = product.cover;
    if (coverFile) {
      this.cloudinaryService.validateFileType(coverFile, 'image');
      const oldPicId = this.cloudinaryService.extractPublicIdFromUrl(
        product.cover,
      );

      const uploadedCover = await this.cloudinaryService.updateImage(
        oldPicId,
        coverFile,
        'products/covers',
      );

      coverUrl = uploadedCover;
    }

    let finalImages: string[] = [];

    if (imagesFiles?.length) {
      this.cloudinaryService.validateFiles(imagesFiles, 'image');
      const uploadedImages = await this.cloudinaryService.uploadMany(
        imagesFiles,
        'products/images',
      );

      const existingImages = Array.isArray(images)
        ? images.filter((url) => product.images.includes(url))
        : [];

      finalImages = [...existingImages, ...uploadedImages];
    } else if (Array.isArray(images) && images.length) {
      finalImages = images.filter((url) => product.images.includes(url));
    } else {
      finalImages = product.images;
    }

    //  Check  category exists
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
    await this.productRepository.save({
      ...product,
      ...rest,
      taxRate: tax,
      defaultTax: defaultTax,
      cover: coverUrl,
      images: finalImages,
      categories: categoryEntity,
    });
    if (variants) {
      if (!variants?.length && product.variants?.length === 0) {
        throw new BadRequestException(
          'Each product must have at least one variant.',
        );
      }
      const incomingVariantIds = variants.filter((v) => v.id).map((v) => v.id);

      const variantsToRemove = product.variants?.filter(
        (pv) => !incomingVariantIds.includes(pv.id),
      );

      if (variantsToRemove?.length) {
        const ids = variantsToRemove.map((v) => v.id);
        await this.variantRepository.delete({ id: In(ids) });
        //make related cart items as invalid
        await this.cartItemReop.update(
          { variant: In(ids) },
          { isValid: false },
        );
      }

      const newVariants = await Promise.all(
        variants
          .filter((v) => !v.id)
          .map(async (v) => {
            const [size, color] = await Promise.all([
              v.size ? this.sizeService.findOne(v.size) : null,
              v.color ? this.colorServices.findOne(v.color) : null,
            ]);

            if (v.price == null || v.quantity == null || !color) {
              throw new BadRequestException(
                `Each new variant must include price, quantity, and color.`,
              );
            }

            return this.variantRepository.create({
              price: v.price,
              quantity: v.quantity,
              product,
              size: size ? { id: size.id } : undefined,
              color: color ? { id: color.id } : undefined,
            });
          }),
      );

      if (newVariants.length) {
        await this.variantRepository.save(newVariants);
      }
    }

    const savedProduct = await this.findOne(product.id);
    return plainToInstance(ProductResponseDto, savedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.softDelete(id);
    await this.cartItemReop.update({ product }, { isValid: false });

    return `Product has been deleted successfully`;
  }

  async restore(id: number) {
    await this.productRepository.restore(id);

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

  async checkVariant(product: Product, variantId: number, quantity: number) {
    const productVariant = product.variants.find(({ id }) => id == variantId);

    const variant = await this.variantRepository.findOne({
      where: { id: variantId },
    });
    if (!productVariant || !variant) {
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
