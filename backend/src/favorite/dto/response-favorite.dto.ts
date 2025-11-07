import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { FavoriteProductResponseDto } from './favorite-product-response.dto';

export class FavoriteResponesDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.variant?.product
      ? plainToInstance(
          FavoriteProductResponseDto,
          { ...obj.variant.product, images: obj.variant.images },
          {
            excludeExtraneousValues: true,
          },
        )
      : null,
  )
  product: FavoriteProductResponseDto;

  @Expose()
  @Transform(({ obj }) => {
    const price = +obj.variant.price;
    if (obj.variant.product.hasTax && obj.variant.product.taxRate) {
      return +(price + (price * obj.variant.product.taxRate) / 100).toFixed(2);
    }
    return price;
  })
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.variant?.id)
  variantId: number;

  @Expose()
  isCart: boolean;

  @Expose()
  cartItemId: number | null;

  @Expose()
  createdAt: Date;
}
