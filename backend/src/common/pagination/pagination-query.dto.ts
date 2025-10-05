import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
