import { Expose, Transform } from 'class-transformer';
import { ResponseAddressDto } from 'src/address/dto/response-address.dto';
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
  @Transform(() => ResponseAddressDto)
  address: ResponseAddressDto;

  @Expose()
  createdAt: Date;
}
