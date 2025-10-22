import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
  Res,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/common/utils/types';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { Response } from 'express';
import { UserRole } from 'src/common/utils/enum';
import { QueryCartDto } from './dto/query-cart.dto';

@UseGuards(AuthGuard)
@OptionalToken()
@Roles(UserRole.User)
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Put()
  @AcceptFormData()
  createOrAddToCart(
    @Body() createCartDto: CreateCartDto,
    @currentUser() payload: JwtPayload,
    @Res() res: Response,
  ) {
    return this.cartService.createOrAddToCart(createCartDto, payload, res);
  }

  @Get()
  findOne(@Query() query: QueryCartDto, @currentUser() user: JwtPayload) {
    return this.cartService.cartDetails(query, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: QueryCartDto,
    @currentUser() user: JwtPayload,
  ) {
    return this.cartService.remove(id, query, user);
  }
}
