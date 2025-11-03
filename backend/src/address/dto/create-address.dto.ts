import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @MaxLength(255)
  @IsNotEmpty()
  street: string;

  @MaxLength(100)
  @IsNotEmpty()
  city: string;

  @MaxLength(100)
  @IsNotEmpty()
  state: string;

  @MaxLength(100)
  @IsNotEmpty()
  country: string;

  @MaxLength(100)
  @IsOptional()
  zipCode: string | undefined;
}
