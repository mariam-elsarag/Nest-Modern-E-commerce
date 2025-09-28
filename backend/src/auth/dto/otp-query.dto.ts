import { IsEnum, IsOptional } from 'class-validator';

export class OtpQueryDto {
  @IsEnum(['activate', 'forget'])
  @IsOptional()
  type?: string;
}
