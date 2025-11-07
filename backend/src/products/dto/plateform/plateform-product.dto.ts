import { Expose, Transform, Type } from 'class-transformer';
import { VariantResponseDto } from '../response-variant.dto';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';

export class PlateformProductDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => obj?.variants?.images?.[0] ?? obj.cover)
  cover: string;

  @Expose()
  title: string;

  @Expose()
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
    const price = +obj.variants.price;
    if (obj.hasTax && obj.taxRate) {
      return +(price + (price * obj.taxRate) / 100).toFixed(2);
    }
    return price;
  })
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.variants.quantity > 0)
  isAvalible: boolean;

  @Expose()
  @Transform(({ obj }) => obj.variants.id)
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
