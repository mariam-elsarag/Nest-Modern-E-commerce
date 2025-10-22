import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartSession } from './entities/cart-session.entity';
import { CartItem } from './entities/cart-items.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/entities/user.entity';
import { ProductsModule } from 'src/products/products.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartSession, CartItem, User]),
    AuthModule,
    ProductsModule,
    SettingsModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
