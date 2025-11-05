import { Expose, Transform } from 'class-transformer';

export class ResponseAddressDto {
  @Expose()
  id: number;

  @Expose()
  street: string;

  @Expose()
  city: string;

  @Expose()
  country: string;

  @Expose()
  state: string;

  @Expose()
  zipCode: string | null;

  @Expose()
  @Transform(({ obj }) =>
    [obj.street, obj.city, obj.state, obj.country].filter(Boolean).join(', '),
  )
  fullAddress: string;
}
