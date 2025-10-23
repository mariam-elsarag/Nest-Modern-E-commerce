import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Terms } from '../entities/terms.entity';
import { Repository } from 'typeorm';
import { CreateTermsDto } from '../dtos/terms.dto';

@Injectable()
export class TermsServices {
  constructor(
    @InjectRepository(Terms) private readonly termsRepo: Repository<Terms>,
  ) {}
  async findOne() {
    const latestTerms = await this.termsRepo.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });

    if (!latestTerms || latestTerms.length === 0) {
      return {};
    }

    return {
      id: latestTerms?.at(0)?.id,
      content: latestTerms?.at(0)?.content,
      content_ar: latestTerms?.at(0)?.content_ar,
    };
  }

  async updateOrCreateTerms(data: CreateTermsDto) {
    const terms = await this.termsRepo.save({ id: 1, ...data });
    return {
      id: terms?.id,
      content: terms?.content,
      content_ar: terms?.content_ar,
    };
  }
}
