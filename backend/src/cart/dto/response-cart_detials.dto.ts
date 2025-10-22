import { Expose, Transform, Type } from 'class-transformer';
import { CartResponseDto } from './response-cart.dto';

export class ResponseCartDetailsDto {
  @Expose()
  @Type(() => CartResponseDto)
  items: CartResponseDto[];

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.items) return 0;
    return +obj.items
      .reduce((sum, item) => sum + (item.totalWithVat || 0), 0)
      .toFixed(2);
  })
  total: number;
}
