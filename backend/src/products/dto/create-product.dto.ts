import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVariantDto } from './create-variant.dto';

export class CreateProductDto {
  @MaxLength(155)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(155)
  @IsString()
  @IsNotEmpty()
  title_ar: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @IsOptional()
  @IsBoolean()
  isAvalible?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'taxRate must be a number' })
  @Min(0, { message: 'taxRate cannot be negative' })
  @Max(100, { message: 'taxRate cannot exceed 100%' })
  taxRate?: number;

  @IsArray()
  @Type(() => Number)
  @ArrayNotEmpty({ message: 'At least one category is required' })
  categories: number[];

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one variant is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variant: CreateVariantDto[];
}
