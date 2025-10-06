import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserQueryDto } from '../dto/query-user.dto';
import { Request } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { AuthService } from 'src/auth/auth.service';
import { User } from '../entities/user.entity';
import { JwtPayload } from 'src/common/utils/types';

import { UpdateUserDto } from '../dto/update-user.dto';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('api/admin/users')
export class AdminUsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authServices: AuthService,
  ) {}

  @Get()
  getAllUsers(
    @Query() query: UserQueryDto,
    @Req() req: Request,
    @currentUser() user: JwtPayload,
  ) {
    const { email } = user;
    return this.usersService.findAll(query, req, email);
  }

  @Post()
  @AcceptFormData()
  inviteAdmin(@Body() body: CreateUserDto) {
    return this.authServices.inviteAdmin(body);
  }

  @Patch(':id')
  @AcceptFormData()
  updateUserInfoByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUserInfo(id, body);
  }

  @Get(':id')
  getUserDetails(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.userDetails(id);
  }
}
