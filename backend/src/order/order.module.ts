import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-items.entity';
import { User } from 'src/users/entities/user.entity';
import { CartSession } from 'src/cart/entities/cart-session.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AddressModule } from 'src/address/address.module';
import { Variant } from 'src/products/entities/variant.entity';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, User, CartSession, Variant]),
    AuthModule,
    AddressModule,
    StripeModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
