import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/response-category.dto';
import { VariantResponseDto } from '../response-variant.dto';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  cover: string;

  @Expose()
  images: string[];

  @Expose()
  title: string;

  @Expose()
  title_ar: string;

  @Expose()
  description: string;

  @Expose()
  description_ar: string;

  @Expose()
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Expose()
  sku: string;

  @Expose()
  isAvalible: boolean;

  @Expose()
  isFeatured: boolean;

  @Expose()
  hasTax: boolean;

  @Expose()
  defaultTax: boolean;

  @Expose()
  taxRate: number;

  @Expose()
  @Type(() => VariantResponseDto)
  variants: VariantResponseDto[];
}
