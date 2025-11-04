import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SupportService } from '../support.service';
import { CreateSupportDto } from '../dto/create-support.dto';
import { OptionalToken } from 'src/auth/decorators/optional-token.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { currentUser, Roles } from 'src/auth/decorators/current-user.decorator';
import { UserRole } from 'src/common/utils/enum';
import { User } from 'src/users/entities/user.entity';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('api/v1/support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @OptionalToken()
  @UseInterceptors(FileInterceptor('attachment', { storage: memoryStorage() }))
  @UseGuards(AuthGuard)
  create(
    @Body() createSupportDto: CreateSupportDto,
    @currentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.supportService.create(createSupportDto, user, file);
  }
}
