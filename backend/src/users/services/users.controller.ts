import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from '../users.service';

import { UpdateProfileDto, UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/common/utils/enum';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { AddressService } from 'src/address/address.service';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';

@Controller('api/v1/profile')
@UseGuards(AuthGuard)
@Roles(UserRole.User)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly AddressService: AddressService,
    private readonly AuthService: AuthService,
  ) {}

  @Get()
  findOne(@currentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Patch('address')
  @AcceptFormData()
  update(@currentUser() user: User, @Body() body: CreateAddressDto) {
    return this.AddressService.createOrUpdateAddress(body, user);
  }

  @Patch('')
  @UseInterceptors(FileInterceptor('avatar', { storage: memoryStorage() }))
  updateUserData(
    @Body() body: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
    @currentUser() user: User,
  ) {
    return this.usersService.updateUserInfo(user.id, body, file);
  }

  @Patch('change-password')
  @AcceptFormData()
  updatePassword(@Body() body: ChangePasswordDto, @currentUser() user: User) {
    return this.AuthService.changePassword(body, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
