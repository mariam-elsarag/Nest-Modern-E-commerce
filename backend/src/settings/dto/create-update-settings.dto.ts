import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateOrUpdateDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  taxRate: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  monthlyOrderGoal: number;
}
