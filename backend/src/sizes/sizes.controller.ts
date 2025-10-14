import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';

@Controller('api/size')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @AcceptFormData()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  // get product size
  @Get('product')
  findProductSizes() {
    return this.sizesService.findProductSizes();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @AcceptFormData()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sizesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @AcceptFormData()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizesService.update(id, updateSizeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sizesService.remove(id);
  }
}
