import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly cloudinaryService: CloudinaryService,
    private readonly colorServices: ColorsService,
    private readonly sizeService: SizesService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const { sizes, colors, categories, ...rest } = createProductDto;

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

    const sizeEntity = await this.sizeService.checkSizeExist({ size: sizes });

    const colorEntity = await this.colorServices.checkColorExists({
      color: colors,
    });

    const savedProduct = await this.productRepository.save({
      ...rest,
      categories: categoryEntity,
      colors: colorEntity,
      sizes: sizeEntity,
      cover: coverUpload,
      images: imagesUpload,
    });

    return this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['categories', 'colors', 'sizes'],
    });
  }

  async findAll(query: QueryProductDto, req: Request) {
    const { search, category, limit = '10', page = '1' } = query;

    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;

    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category');

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
      relations: ['categories', 'colors', 'sizes'],
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
    const { images, categories, colors, sizes, ...rest } = updateProductDto;
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
    let sizeEntity = product.sizes;
    if (sizes?.length) {
      sizeEntity = await this.sizeService.checkSizeExist({ size: sizes });
    }
    let colorEntity = product.colors;
    if (colors?.length) {
      colorEntity = await this.colorServices.checkColorExists({
        color: colors,
      });
    }
    const savedProduct = await this.productRepository.save({
      ...product,
      ...rest,
      cover: coverUrl,
      images: finalImages,
      categories: categoryEntity,
      colors: colorEntity,
      sizes: sizeEntity,
    });

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
