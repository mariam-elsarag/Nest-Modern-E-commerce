import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryProductDto extends PaginationQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  category?: number;
}

export class HiglightProductsQueryDto {
  @IsOptional()
  type?: 'featured' | 'latest';

  @IsOptional()
  cartToken?: string;
}

export class PlateformProductListQueryDto extends PaginationQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  color?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size?: number;

  @IsOptional()
  categories?: number[];
}
