import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryProductDto extends PaginationQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  category?: number;
}
