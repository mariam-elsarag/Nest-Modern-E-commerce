import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './services/users.controller';
import { AdminUsersController } from './services/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AddressModule } from 'src/address/address.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    AddressModule,
    CloudinaryModule,
  ],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService],
})
export class UsersModule {}
