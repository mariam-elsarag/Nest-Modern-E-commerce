import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSupportDto {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  fullName: string;

  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  subject?: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  message: string;
}
