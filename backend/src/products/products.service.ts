import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CategoryService } from 'src/category/category.service';

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
    const { variant, categories } = createProductDto;
    if (!files?.length) {
      throw new BadRequestException('No files uploaded');
    }

    const coverFile = files.find((f) => f.fieldname === 'cover');
    const imagesFiles = files.filter((f) => f.fieldname === 'images');

    let coverUpload;
    // if (coverFile) {
    //   this.cloudinaryService.validateFileType(coverFile, 'image');
    //   coverUpload = await this.cloudinaryService.uploadImage(
    //     coverFile,
    //     'products/covers',
    //   );
    // }

    let imagesUpload;
    // if (imagesFiles?.length) {
    //   this.cloudinaryService.validateFiles(imagesFiles, 'image');
    //   imagesUpload = await this.cloudinaryService.uploadMany(
    //     imagesFiles,
    //     'products/images',
    //   );
    // }

    // check if category ids  are exist

    await this.categoryService.checkCategoryExists({ categories });

    // check if color ids and size ids are exist
    if (variant?.length) {
      await Promise.all(
        variant.map(async (v) => {
          await this.colorServices.checkColorExists({ color: v.color });
          if (v.size?.length > 0) {
            await this.sizeService.checkSizeExist({ size: v.size });
          }
        }),
      );
    }
    return { cover: coverUpload, images: imagesUpload, createProductDto };
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
