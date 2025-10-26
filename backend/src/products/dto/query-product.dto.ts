import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

import { Type } from 'class-transformer';
import { IntersectionType } from '@nestjs/mapped-types';

export class CartTokeQueryDto {
  @IsOptional()
  cartToken?: string;
}
export class QueryProductDto extends PaginationQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  category?: number;
}

export class HiglightProductsQueryDto extends CartTokeQueryDto {
  @IsOptional()
  type?: 'featured' | 'latest';
}

export class FilterProductQueryDto extends IntersectionType(
  PaginationQueryDto,
  CartTokeQueryDto,
) {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  color?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size?: number;

  @IsOptional()
  categories?: string;

  @Min(0)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  maxPrice?: number;
}
