import { Expose, Transform, Type } from 'class-transformer';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';
import { SizeResponseDto } from 'src/sizes/dto/response-size.dto';

export class CartResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.product?.cover || null)
  cover: string | null;

  @Expose()
  @Transform(({ obj }) => obj.product?.title)
  title: string;

  @Expose()
  @Transform(({ obj }) => obj.product?.title_ar)
  title_ar: string;

  @Expose()
  @Type(() => ColorResponseDto)
  @Transform(({ obj }) => obj.variant?.color)
  color: ColorResponseDto;

  @Expose()
  @Type(() => SizeResponseDto)
  @Transform(({ obj }) => obj.variant?.size)
  size: SizeResponseDto;

  @Expose()
  @Transform(({ obj }) => obj.quantity)
  quantity: number;

  @Expose()
  isValid: boolean;

  @Expose()
  @Transform(({ obj }) => +obj.priceWithVat.toFixed(2))
  price: number;
}
