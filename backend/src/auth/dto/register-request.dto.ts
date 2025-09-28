import {
  IsEmail,
  IsString,
  IsEnum,
  MaxLength,
  IsStrongPassword,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { phoneNumberRegx } from 'src/common/utils/validator';

export class RegisterDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @MaxLength(13)
  @IsNotEmpty()
  @Matches(phoneNumberRegx, {
    message: 'Phone number must be a valid Egyptian number',
  })
  phone: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}
