import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { UserRole } from 'src/common/utils/enum';

export class UserQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
