import { Expose, Transform, Type } from 'class-transformer';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';
import { SizeResponseDto } from 'src/sizes/dto/response-size.dto';

class CartProductDto {
  @Expose()
  @Transform(({ obj }) => obj?.cover || null)
  cover: string | null;

  @Expose()
  @Transform(({ obj }) => obj?.title)
  title: string;

  @Expose()
  @Transform(({ obj }) => obj?.title_ar)
  title_ar: string;
}
export class CartResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    return {
      cover:
        obj.variant.images?.length > 0
          ? obj.variant.images?.[0]
          : obj.product.cover,

      title: obj.product.title,
      title_ar: obj.product.title_ar,
    };
  })
  product: CartProductDto;

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
  @Transform(({ obj }) => obj.variant.quantity)
  maxQuantity: number;

  @Expose()
  @Transform(({ obj }) => obj.variant.id)
  variantId: number;

  @Expose()
  isValid: boolean;

  @Expose()
  @Transform(({ obj }) => +obj.priceWithVat.toFixed(2))
  price: number;
}
