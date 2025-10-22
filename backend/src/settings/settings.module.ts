import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsAdminController } from './services/settings-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/settings.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, User]), AuthModule],
  controllers: [SettingsAdminController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
