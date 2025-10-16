import { Expose, Type } from 'class-transformer';
import { FavoriteProductResponseDto } from './favorite-product-response.dto';

export class FavoriteResponesDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => FavoriteProductResponseDto)
  product: FavoriteProductResponseDto;

  @Expose()
  createdAt: Date;
}
