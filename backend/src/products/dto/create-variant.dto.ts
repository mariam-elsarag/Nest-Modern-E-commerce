import {
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'price must be a valid decimal with up to 2 digits after the point',
    },
  )
  @Min(0, { message: 'price cannot be negative' })
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'quantity must be a valid number' })
  quantity: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'At least one color is required' })
  @Type(() => Number)
  color: number[];

  @IsArray()
  @Type(() => Number)
  @IsOptional()
  size: number[];

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9-]+$/, {
    message: 'SKU must contain only letters, numbers, or hyphens',
  })
  sku: string;
}
