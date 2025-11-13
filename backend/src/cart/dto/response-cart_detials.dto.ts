import { Expose, Transform, Type } from 'class-transformer';
import { CartResponseDto } from './response-cart.dto';

export class ResponseCartDetailsDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => CartResponseDto)
  items: CartResponseDto[];

  @Expose()
  subTotal: number;

  @Expose()
  @Type(() => Number)
  shipping: number;

  @Expose()
  @Transform(({ obj }) => {
    const price = (+obj.subTotal + +obj.shipping).toFixed(2);
    return +price;
  })
  total: number;
}
