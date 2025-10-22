import { Expose, Transform, Type } from 'class-transformer';

export class FavoriteProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  cover: string | null;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;
}
