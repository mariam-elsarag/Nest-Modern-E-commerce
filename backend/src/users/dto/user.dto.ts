import { Expose, Transform } from 'class-transformer';
import { AccountStatus, UserRole } from 'src/common/utils/enum';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  fullName: string;

  @Expose()
  phone: string;

  @Expose()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  status: AccountStatus;

  @Expose()
  avatar: string | null;

  @Expose()
  address: string | null;

  @Expose()
  createdAt: Date;
}
