import { Expose } from 'class-transformer';

export class ColorResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  name_ar: string;

  @Expose()
  color: string;
}
