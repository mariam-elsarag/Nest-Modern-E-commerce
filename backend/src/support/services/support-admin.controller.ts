import {
  Body,
  Controller,
  Delete,
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
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/common/utils/enum';
import { SupportService } from '../support.service';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';
import { UpdateSupportDto } from '../dto/update-support.dto';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { ReplyByAdminSupportDto } from '../dto/reply-support-dto';

@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@Controller('api/v1/admin/support')
export class AdminSupportController {
  constructor(private readonly supportService: SupportService) {}

  // admin reply
  @Post(':id/reply')
  @HttpCode(HttpStatus.OK)
  @AcceptFormData()
  adminReply(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReplyByAdminSupportDto,
  ) {
    return this.supportService.adminReply(body, id);
  }
  // support list
  @Get()
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    return this.supportService.findAll(query, req);
  }

  // support details
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supportService.findOne(id);
  }

  // update
  @Patch(':id')
  @AcceptFormData()
  updated(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSupportDto,
  ) {
    return this.supportService.update(id, body);
  }

  // toggle read
  @Patch(':id/read')
  @AcceptFormData()
  toggleRead(@Param('id', ParseIntPipe) id: number) {
    return this.supportService.toggleRead(id);
  }

  // delete support
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supportService.remove(id);
  }
}
