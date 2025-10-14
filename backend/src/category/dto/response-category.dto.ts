import { Expose } from 'class-transformer';

export class CategoryResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  title_ar: string;
}
