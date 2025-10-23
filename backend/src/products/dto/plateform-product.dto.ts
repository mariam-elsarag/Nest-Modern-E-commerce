import { Expose, Transform } from 'class-transformer';

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
