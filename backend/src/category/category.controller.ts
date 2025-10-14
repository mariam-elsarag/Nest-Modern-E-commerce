import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @AcceptFormData()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    return this.categoryService.findAll(query, req);
  }

  @Get('list')
  findAllWithoutPagination() {
    return this.categoryService.findAllWithoutPagination();
  }

  @Get('product')
  findProductCategories() {
    return this.categoryService.findProductCategory();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @AcceptFormData()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
