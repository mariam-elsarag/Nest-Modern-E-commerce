import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  label: string;
}
