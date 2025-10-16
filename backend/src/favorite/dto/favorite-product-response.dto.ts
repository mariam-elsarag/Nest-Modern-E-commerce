import { Expose, Type } from 'class-transformer';

export class FavoriteProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;

  @Expose()
  @Type(() => Number)
  price: number;
}
