import { Expose, Transform, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/response-category.dto';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';
import { Color } from 'src/colors/entities/color.entity';
import { StockStatus } from 'src/common/utils/enum';
import { SizeResponseDto } from 'src/sizes/dto/response-size.dto';
import { Size } from 'src/sizes/entities/size.entity';

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
  @Transform(({ obj }) => {
    const q = obj.quantity || 0;
    if (q > 10) return StockStatus.InStock;
    if (q > 0 && q <= 10) return StockStatus.LittleAmount;
    return StockStatus.OutOfStock;
  })
  stock: StockStatus;

  @Expose()
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Expose()
  @Type(() => ColorResponseDto)
  colors: ColorResponseDto[];

  @Expose()
  @Type(() => SizeResponseDto)
  sizes: SizeResponseDto[];

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  quantity: number;

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
}
