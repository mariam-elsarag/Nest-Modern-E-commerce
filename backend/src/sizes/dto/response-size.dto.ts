import { Expose } from 'class-transformer';

export class SizeResponseDto {
  @Expose()
  id: number;

  @Expose()
  label: string;
}
