import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { TermsServices } from '../services/terms.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { CreateTermsDto } from '../dtos/terms.dto';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';

@Controller('api/v1/cms/terms')
export class TermsController {
  constructor(private readonly termsService: TermsServices) {}

  // terms for user
  @Get()
  findOne() {
    return this.termsService.findOne();
  }
  @Get('admin')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  findOneAdmin() {
    return this.termsService.findOne();
  }
  @Put('admin')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @AcceptFormData()
  createOrUpdate(@Body() body: CreateTermsDto) {
    return this.termsService.updateOrCreateTerms(body);
  }
}
