import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { DeleteColorDto } from './dto/delete-color.dto';

@Controller('api/color')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @AcceptFormData()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  findAll() {
    return this.colorsService.findAll();
  }
  // product colors (color that use in products)
  @Get('product')
  getProductsColor() {
    return this.colorsService.findProductColors();
  }

  @Delete()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Body() body: DeleteColorDto) {
    return this.colorsService.remove(body);
  }
}
