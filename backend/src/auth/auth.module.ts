import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { Address } from 'src/address/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]), MailModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
