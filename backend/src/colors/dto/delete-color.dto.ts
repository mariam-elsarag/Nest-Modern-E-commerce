import { IsArray, IsNotEmpty } from 'class-validator';

export class DeleteColorDto {
  @IsArray()
  @IsNotEmpty()
  ids: number[];
}
