import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './services/support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdminSupportController } from './services/support-admin.controller';
import { MailModule } from 'src/mail/mail.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Support, User]),
    AuthModule,
    MailModule,
    CloudinaryModule,
  ],
  controllers: [SupportController, AdminSupportController],
  providers: [SupportService],
})
export class SupportModule {}
