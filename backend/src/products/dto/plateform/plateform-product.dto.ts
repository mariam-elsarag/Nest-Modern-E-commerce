import { Expose, Transform, Type } from 'class-transformer';
import { VariantResponseDto } from '../response-variant.dto';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';

export class PlateformProductDto {
  @Expose()
  @Transform(({ obj }) => obj?.product.id)
  id: number;

  @Expose()
  @Transform(({ obj }) => obj?.images?.[0] ?? obj.product.cover)
  cover: string;

  @Expose()
  @Transform(({ obj }) => obj?.product.title)
  title: string;

  @Expose()
  @Transform(({ obj }) => obj?.product.title_ar)
  title_ar: string;

  @Expose()
  isFavorite: boolean;

  @Expose()
  isCart: boolean;

  @Expose()
  cartItemId: number | null;

  @Expose()
  averageRating: number;

  @Expose()
  @Transform(({ obj }) => {
    const price = +obj.price;
    if (obj.product.hasTax && obj.product.taxRate) {
      return +(price + (price * obj.product.taxRate) / 100).toFixed(2);
    }
    return price;
  })
  price: number;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.discountPercent) {
      const price = +obj.price;
      if (obj.product.hasTax && obj.product.taxRate) {
        const priceAfterTax = +(
          price +
          (price * obj.product.taxRate) / 100
        ).toFixed(2);
        return +(
          priceAfterTax +
          (priceAfterTax * obj.discountPercent) / 100
        ).toFixed(2);
      }
    } else {
      return 0;
    }
  })
  priceAfterDiscount: number;

  @Expose()
  @Transform(({ obj }) => obj.quantity > 0)
  isAvalible: boolean;

  @Expose()
  @Transform(({ obj }) => obj.id)
  variantId: number;
}

export class PlateformProductDetailsDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;

  @Expose()
  description: string;

  @Expose()
  description_ar: string;

  @Expose()
  isAvalible: boolean;

  @Expose()
  cover: string;

  @Expose()
  isFavorite: boolean;

  @Expose()
  reviewCount: number;

  @Expose()
  averageRating: number;

  @Expose()
  @Transform(({ obj }) => {
    const hasTax = obj.hasTax && obj.taxRate;
    return obj.variants.map((variant) => ({
      ...variant,
      price: hasTax
        ? +variant.price + (+variant.price * obj.taxRate) / 100
        : +variant.price,
    }));
  })
  variants: VariantResponseDto[];
}
