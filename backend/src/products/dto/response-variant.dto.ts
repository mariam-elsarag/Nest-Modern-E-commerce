import { Expose, Type } from 'class-transformer';
import { ColorResponseDto } from 'src/colors/dto/response-color.dto';
import { SizeResponseDto } from 'src/sizes/dto/response-size.dto';

export class VariantResponseDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Number)
  price: number;

  @Expose()
  @Type(() => Number)
  quantity: number;

  @Expose()
  @Type(() => ColorResponseDto)
  color: ColorResponseDto;

  @Expose()
  @Type(() => SizeResponseDto)
  size: SizeResponseDto;
}
