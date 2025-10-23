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
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { FaqServices } from '../services/faq.service';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';

@Controller('api/v1/cms/faq')
export class FaqController {
  constructor(private readonly faqService: FaqServices) {}

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get('admin')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  findAllAdmin(@Query() query: PaginationQueryDto, @Req() req: Request) {
    return this.faqService.findAllAdmin(query, req);
  }

  @Post('admin')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @AcceptFormData()
  create(@Body() body: CreateFaqDto) {
    return this.faqService.create(body);
  }

  @Get('admin/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @AcceptFormData()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.findOne(id);
  }

  @Patch('admin/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @AcceptFormData()
  update(@Body() body: UpdateFaqDto, @Param('id', ParseIntPipe) id: number) {
    return this.faqService.update(body, id);
  }

  @Delete('admin/:id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @AcceptFormData()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.remove(id);
  }
}
