import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class FindCategoryDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one category is required' })
  @Type(() => Number)
  categories: number[];
}
