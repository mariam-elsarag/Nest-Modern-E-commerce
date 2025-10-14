import { Expose, Transform, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/category/dto/response-category.dto';
import { Category } from 'src/category/entities/category.entity';
import { StockStatus } from 'src/common/utils/enum';

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
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  quantity: number;

  @Expose()
  sku: string;

  @Expose()
  updatedAt: Date;
}
