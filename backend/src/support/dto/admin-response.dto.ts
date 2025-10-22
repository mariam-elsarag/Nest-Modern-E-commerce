import { Expose, Transform } from 'class-transformer';
import { TicketStatus } from 'src/common/utils/enum';

export class AdminSupportResponseDto {
  @Expose()
  id: number;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  subject?: string;

  @Expose()
  message: string;

  @Expose()
  status: TicketStatus;

  @Expose()
  @Transform(({ obj }) => (obj.deletedAt ? true : false))
  isDeleted: boolean;

  @Expose()
  isRead: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  solvedAt: Date;

  @Expose()
  repliedAt: Date;
}
