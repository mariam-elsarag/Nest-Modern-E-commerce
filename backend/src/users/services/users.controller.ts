import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users.service';

import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/common/utils/enum';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { AddressService } from 'src/address/address.service';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';

@Controller('api/v1/profile')
@UseGuards(AuthGuard)
@Roles(UserRole.User)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly AddressService: AddressService,
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
