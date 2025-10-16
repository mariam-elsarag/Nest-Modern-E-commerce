import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateVariantDto {
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'price must be a valid decimal with up to 2 digits after the point',
    },
  )
  @Min(0, { message: 'price cannot be negative' })
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'quantity must be a valid number' })
  quantity: number;

  @Type(() => Number)
  @IsNotEmpty()
  color: number;

  @IsOptional()
  size?: number;
}
