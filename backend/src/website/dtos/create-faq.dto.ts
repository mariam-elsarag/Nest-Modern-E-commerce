import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFaqDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  question: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  question_ar: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  answer: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  answer_ar: string;
}
