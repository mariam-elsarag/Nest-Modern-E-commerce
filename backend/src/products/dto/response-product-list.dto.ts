import { Expose, Transform, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/response-category.dto';
import { Category } from 'src/category/entities/category.entity';
import { StockStatus } from 'src/common/utils/enum';
import { Variant } from '../entities/variant.entity';

export class ProductListResponseDto {
  @Expose()
  id: number;

  @Expose()
  cover: string;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;

  @Expose()
  isAvalible: boolean;

  @Expose()
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Type(() => Variant)
  variants: Variant[];

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.variants || obj.variants.length === 0) return 0;
    return Math.min(...obj.variants.map((v) => v.price));
  })
  price: number;

  @Expose()
  sku: string;

  @Expose()
  @Transform(({ obj }) => (obj.deletedAt ? true : false))
  isDeleted: boolean;

  @Expose()
  updatedAt: Date;
}
