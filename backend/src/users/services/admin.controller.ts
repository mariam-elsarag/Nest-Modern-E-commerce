import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserQueryDto } from '../dto/query-user.dto';
import { Request } from 'express';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('api/admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query() query: UserQueryDto, @Req() req: Request) {
    return this.usersService.findAll(query, req);
  }
}
