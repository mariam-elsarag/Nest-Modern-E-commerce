import { IsOptional, IsString } from 'class-validator';

export class QueryCartDto {
  @IsString()
  @IsOptional()
  cartToken?: string;
}
