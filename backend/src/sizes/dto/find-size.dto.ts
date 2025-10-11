import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class FindSizeDto {
  @IsArray()
  @Type(() => Number)
  @ArrayNotEmpty({ message: 'At least one size is required' })
  size: number[];
}
