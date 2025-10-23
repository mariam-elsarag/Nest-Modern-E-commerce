import { forwardRef, Module } from '@nestjs/common';
import { ProductsAdminService } from './providers/products-admin.service';
import { ProductsAdminController } from './controller/products-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from './entities/product.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ColorsModule } from 'src/colors/colors.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { CategoryModule } from 'src/category/category.module';
import { Variant } from './entities/variant.entity';
import { ProductController } from './controller/products.controller';
import { CartItem } from 'src/cart/entities/cart-items.entity';
import { SettingsModule } from 'src/settings/settings.module';
import { ProductsService } from './providers/products.service';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Variant, CartItem, Favorite]),
    AuthModule,
    CloudinaryModule,
    ColorsModule,
    SizesModule,
    CategoryModule,
    SettingsModule,
    forwardRef(() => CartModule),
  ],
  controllers: [ProductsAdminController, ProductController],
  providers: [ProductsAdminService, ProductsService],
  exports: [ProductsAdminService],
})
export class ProductsModule {}
