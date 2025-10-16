import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CategoryService } from 'src/category/category.service';
import { Request } from 'express';
import { QueryProductDto } from './dto/query-product.dto';
import { plainToInstance } from 'class-transformer';
import { ProductListResponseDto } from './dto/response-product-list.dto';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';
import { ProductResponseDto } from './dto/response-product.dto';
import { Variant } from './entities/variant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly colorServices: ColorsService,
    private readonly sizeService: SizesService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const { variants, categories, ...rest } = createProductDto;

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

    const savedProduct = await this.productRepository.save({
      ...rest,
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
      .orderBy('product.createdAt', 'DESC')
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
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const { images, categories, variants, ...rest } = updateProductDto;
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

    await this.productRepository.save({
      ...product,
      ...rest,
      cover: coverUrl,
      images: finalImages,
      categories: categoryEntity,
    });
    if (variants?.length) {
      const resolvedVariants = await Promise.all(
        variants.map(async (v) => {
          const existingVariant = product.variants?.find(
            (pv) => pv.id === v.id,
          );

          const [size, color] = await Promise.all([
            v.size
              ? this.sizeService.findOne(v.size)
              : existingVariant?.size
                ? { id: existingVariant.size.id }
                : null,
            v.color
              ? this.colorServices.findOne(v.color)
              : existingVariant?.color
                ? { id: existingVariant.color.id }
                : null,
          ]);

          if (!existingVariant) {
            if (v.price == null || v.quantity == null || !color) {
              throw new BadRequestException(
                `Each new variant must include price, quantity, and color.`,
              );
            }
          }

          if (existingVariant) {
            existingVariant.price = v.price ?? existingVariant.price;
            existingVariant.quantity = v.quantity ?? existingVariant.quantity;
            existingVariant.size = size
              ? (size as any)
              : (existingVariant.size as any);
            existingVariant.color = color
              ? (color as any)
              : (existingVariant.color as any);

            return existingVariant;
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

      await this.variantRepository.save(resolvedVariants);
    }

    const savedProduct = await this.findOne(product.id);
    return plainToInstance(ProductResponseDto, savedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productRepository.softDelete(id);
    return `Product has been deleted successfully`;
  }
}
