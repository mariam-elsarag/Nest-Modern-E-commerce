import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { HiglightProductsQueryDto } from '../dto/query-product.dto';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { ProductsService } from '../providers/products.service';
import { User } from 'src/users/entities/user.entity';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get('highlights')
  @OptionalToken()
  @UseGuards(AuthGuard)
  highlights(
    @Query() query: HiglightProductsQueryDto,
    @currentUser() user: User,
  ) {
    return this.productService.highlights(query, user);
  }
}
