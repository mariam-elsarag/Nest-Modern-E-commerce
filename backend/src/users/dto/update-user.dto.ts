import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { AccountStatus, UserRole } from 'src/common/utils/enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsString()
  @IsOptional()
  @IsEnum([AccountStatus.Active, AccountStatus.Blocked], {
    message: 'Status must be either active or blocked',
  })
  status?: AccountStatus;
}
