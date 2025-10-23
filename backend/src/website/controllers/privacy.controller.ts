import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { PrivacyServices } from '../services/privacy.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/common/utils/enum';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { CreatePrivacyDto } from '../dtos/privacy.dto';

@Controller('api/v1/cms/privacy')
export class PrivacyController {
  constructor(private readonly privacyService: PrivacyServices) {}

  @Get()
  findOne() {
    return this.privacyService.findOne();
  }

  @Get('admin')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  findOneAdmin() {
    return this.privacyService.findOne();
  }

  @Put('admin')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @AcceptFormData()
  createOrUpdate(@Body() body: CreatePrivacyDto) {
    return this.privacyService.updateOrCreatePrivacy(body);
  }
}
