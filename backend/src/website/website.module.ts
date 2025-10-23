import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Terms } from './entities/terms.entity';
import { Privacy } from './entities/privacy.entity';
import { Faq } from './entities/faq.entity';
import { TermsController } from './controllers/terms.controller';
import { TermsServices } from './services/terms.service';
import { PrivacyController } from './controllers/privacy.controller';
import { FaqController } from './controllers/faq.controller';
import { PrivacyServices } from './services/privacy.service';
import { FaqServices } from './services/faq.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Terms, Privacy, Faq])],
  controllers: [TermsController, PrivacyController, FaqController],
  providers: [TermsServices, PrivacyServices, FaqServices],
})
export class WebsiteModule {}
