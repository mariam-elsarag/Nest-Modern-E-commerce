import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from '../settings.service';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { CreateOrUpdateDto } from '../dto/create-update-settings.dto';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard)
@Controller('api/admin/settings')
export class SettingsAdminController {
  constructor(private readonly settingsService: SettingsService) {}

  @Patch()
  @AcceptFormData()
  updateOrCreateSetting(@Body() body: CreateOrUpdateDto) {
    return this.settingsService.updateOrCreateSetting(body);
  }
}
