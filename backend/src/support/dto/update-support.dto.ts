import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from 'src/common/utils/enum';

export class UpdateSupportDto {
  @IsEnum(
    [
      TicketStatus.Open,
      TicketStatus.InProgress,
      TicketStatus.Solved,
      TicketStatus.Closed,
    ],
    {
      message:
        'Invalid status. Allowed values: [open, inProgress, solved, closed]',
    },
  )
  @IsOptional()
  status?: TicketStatus;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isRead?: boolean;
}
