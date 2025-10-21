import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  product: number;

  @Min(1)
  @Type(() => Number)
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  variant: number;

  @IsString()
  @IsOptional()
  cartToken?: string;
}
