import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsAdminController } from './providers/products-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from './entities/product.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ColorsModule } from 'src/colors/colors.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { CategoryModule } from 'src/category/category.module';
import { Variant } from './entities/variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Variant]),
    AuthModule,
    CloudinaryModule,
    ColorsModule,
    SizesModule,
    CategoryModule,
  ],
  controllers: [ProductsAdminController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
