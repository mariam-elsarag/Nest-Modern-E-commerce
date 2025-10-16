import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { MailModule } from './mail/mail.module';
import { ColorsModule } from './colors/colors.module';
import { Color } from './colors/entities/color.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { SettingsModule } from './settings/settings.module';
import { Setting } from './settings/entities/settings.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { SizesModule } from './sizes/sizes.module';
import { Size } from './sizes/entities/size.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FavoriteModule } from './favorite/favorite.module';
import { Favorite } from './favorite/entities/favorite.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string>('JWT_EXPIRE_IN') },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DB_DATABASE'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          port: config.get<number>('DB_PORT'),
          host: 'localhost',
          synchronize: process.env.NODE_ENV !== 'production' ? true : false,
          entities: [User, Color, Category, Size, Setting, Product, Favorite],
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MailModule,
    ColorsModule,
    CategoryModule,
    SettingsModule,
    ProductsModule,
    SizesModule,
    CloudinaryModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
