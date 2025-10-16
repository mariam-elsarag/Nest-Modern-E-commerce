import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtPayload } from 'src/common/utils/types';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';

@Roles(UserRole.User)
@UseGuards(AuthGuard)
@Controller('api/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    return this.favoriteService.findAll(query, req);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @currentUser() user: JwtPayload,
  ) {
    return this.favoriteService.update(id, user);
  }
}
