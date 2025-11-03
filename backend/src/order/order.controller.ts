import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { User } from 'src/users/entities/user.entity';

@UseGuards(AuthGuard)
@OptionalToken()
@Roles(UserRole.User)
@Controller('api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @AcceptFormData()
  createOrder(@Body() body: CreateOrderDto, @currentUser() user: User) {
    return this.orderService.checkout(body, user);
  }
}
