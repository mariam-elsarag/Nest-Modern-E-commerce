import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Color]), AuthModule],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}
