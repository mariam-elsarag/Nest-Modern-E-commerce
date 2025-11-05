import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @MaxLength(255)
  @IsOptional()
  street: string;

  @MaxLength(100)
  @IsOptional()
  city: string;

  @MaxLength(100)
  @IsOptional()
  state: string;

  @MaxLength(100)
  @IsOptional()
  country: string;

  @MaxLength(7)
  @IsOptional()
  zipCode: string | undefined;
}
