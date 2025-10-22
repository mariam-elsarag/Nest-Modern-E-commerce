import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyByAdminSupportDto {
  @IsString()
  @IsNotEmpty()
  reply: string;
}
