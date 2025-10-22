import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SupportService } from '../support.service';
import { CreateSupportDto } from '../dto/create-support.dto';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { User } from 'src/users/entities/user.entity';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';

@Controller('api/v1/support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @OptionalToken()
  @UseGuards(AuthGuard)
  @Roles(UserRole.User)
  @AcceptFormData()
  create(
    @Body() createSupportDto: CreateSupportDto,
    @currentUser() user: User,
  ) {
    return this.supportService.create(createSupportDto, user);
  }
}
