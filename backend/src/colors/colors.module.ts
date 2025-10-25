import { forwardRef, Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Color } from './entities/color.entity';
import { ProductsModule } from 'src/products/products.module';
import { Variant } from 'src/products/entities/variant.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Color, Variant, Product]),
    AuthModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
