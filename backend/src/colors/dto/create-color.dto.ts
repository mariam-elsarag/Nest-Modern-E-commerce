import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name_ar: string;

  @IsString()
  @MaxLength(9)
  @IsNotEmpty()
  color: string;
}
