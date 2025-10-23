import { IsString } from 'class-validator';

export class CreateTermsDto {
  @IsString()
  content: string;

  @IsString()
  content_ar: string;
}
