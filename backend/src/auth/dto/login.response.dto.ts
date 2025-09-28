import { Expose, Transform } from 'class-transformer';
import { UserRole } from 'src/common/utils/enum';

export class LoginResponseDto {
  @Expose()
  id: string;

  @Expose()
  token: string;

  @Expose()
  fullName: string;

  @Expose()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  avatar: string | null;
}
