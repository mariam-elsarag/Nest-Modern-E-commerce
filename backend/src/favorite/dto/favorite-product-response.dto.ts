import { Expose, Transform } from 'class-transformer';

export class FavoriteProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => (obj.images?.length > 0 ? obj.images[0] : obj.cover))
  cover: string | null;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;
}
