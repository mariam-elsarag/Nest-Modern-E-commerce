import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  FilterProductQueryDto,
  HiglightProductsQueryDto,
} from '../dto/query-product.dto';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { ProductsService } from '../providers/products.service';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

@Controller('api/v1/product')
@OptionalToken()
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get('highlights')
  highlights(
    @Query() query: HiglightProductsQueryDto,
    @currentUser() user: User,
  ) {
    return this.productService.highlights(query, user);
  }

  @Get()
  productList(
    @Query() query: FilterProductQueryDto,
    @Req() req: Request,
    @currentUser() user: User,
  ) {
    return this.productService.products(query, req, user);
  }

  @Get(':id')
  productDetails(
    @Param('id', ParseIntPipe) id: number,
    @currentUser() user: User,
  ) {
    return this.productService.productDetails(id, user);
  }

  @Get(':id')
  similarProducts(
    @Param('id', ParseIntPipe) id: number,
    @currentUser() user: User,
  ) {}
}
