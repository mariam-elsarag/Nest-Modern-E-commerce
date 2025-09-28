import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { SendOtpDto } from './send-otp.dto';

export class VerifyOtpDto extends SendOtpDto {
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}
