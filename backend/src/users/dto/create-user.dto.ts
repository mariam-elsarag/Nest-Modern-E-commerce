import { OmitType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/auth/dto/register-request.dto';
export class CreateUserDto extends OmitType(RegisterDto, [
  'password',
] as const) {}
