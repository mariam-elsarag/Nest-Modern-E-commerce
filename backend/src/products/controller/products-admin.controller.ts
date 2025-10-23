import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Query,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { QueryProductDto } from '../dto/query-product.dto';
import { ProductsAdminService } from '../providers/products-admin.service';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('api/v1/admin/product')
export class ProductsAdminController {
  constructor(private readonly productsAdminService: ProductsAdminService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor({ storage: memoryStorage() }))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsAdminService.create(createProductDto, files);
  }

  @Get()
  findAll(@Query() query: QueryProductDto, @Req() req: Request) {
    return this.productsAdminService.findAll(query, req);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsAdminService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor({ storage: memoryStorage() }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsAdminService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsAdminService.remove(id);
  }
  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.productsAdminService.restore(id);
  }
}
