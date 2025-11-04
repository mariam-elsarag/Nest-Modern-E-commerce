import { Expose, Transform, Type } from 'class-transformer';
import { VariantResponseDto } from '../response-variant.dto';

export class PlateformProductDto {
  @Expose()
  id: number;

  @Expose()
  cover: string;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;

  @Expose()
  isAvalible: boolean;

  @Expose()
  isFavorite: boolean;

  @Expose()
  isCart: boolean;

  @Expose()
  averageRating: number;

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.variants?.length) return 0;
    const prices = obj.variants.map((v) => +v.price);
    const minPrice = Math.min(...prices);

    if (obj.hasTax && obj.taxRate) {
      return +(minPrice + (minPrice * obj.taxRate) / 100).toFixed(2);
    }

    return +minPrice.toFixed(2);
  })
  minPrice: number;
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
  @Transform(({ obj }) => {
    const images = Array.isArray(obj.images) ? obj.images : [];
    const cover = obj.cover ? [obj.cover] : [];
    return [...cover, ...images];
  })
  images: string[];

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
