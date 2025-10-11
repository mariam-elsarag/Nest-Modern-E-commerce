import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray } from 'class-validator';

export class FindColorDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one color is required' })
  @Type(() => Number)
  color: number[];
}
