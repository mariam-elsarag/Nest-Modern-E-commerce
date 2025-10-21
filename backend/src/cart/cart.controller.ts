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
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/common/utils/types';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { Response } from 'express';

@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Put()
  @UseGuards(AuthGuard)
  @OptionalToken()
  @AcceptFormData()
  createOrAddToCart(
    @Body() createCartDto: CreateCartDto,
    @currentUser() payload: JwtPayload,
    @Res() res: Response,
  ) {
    return this.cartService.createOrAddToCart(createCartDto, payload, res);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
