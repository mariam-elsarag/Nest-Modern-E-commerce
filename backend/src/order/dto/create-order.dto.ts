import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { PaymentMethod } from 'src/common/utils/enum';

export class CreateOrderDto extends PartialType(CreateAddressDto) {
  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  fullName: string;

  @IsEnum(PaymentMethod, {
    message: `paymentMethod must be one of the following values:cash or geteway `,
  })
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  cart: number;

  @IsOptional()
  cartToken?: string;
}
