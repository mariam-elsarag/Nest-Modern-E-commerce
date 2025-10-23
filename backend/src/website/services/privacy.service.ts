import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Privacy } from '../entities/privacy.entity';
import { Repository } from 'typeorm';
import { CreatePrivacyDto } from '../dtos/privacy.dto';

@Injectable()
export class PrivacyServices {
  constructor(
    @InjectRepository(Privacy)
    private readonly privacyRepo: Repository<Privacy>,
  ) {}

  async findOne() {
    const lastPrivacy = await this.privacyRepo.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });

    if (!lastPrivacy || lastPrivacy.length === 0) {
      return {};
    }

    return {
      id: lastPrivacy?.at(0)?.id,
      content: lastPrivacy?.at(0)?.content,
      content_ar: lastPrivacy?.at(0)?.content_ar,
    };
  }

  async updateOrCreatePrivacy(data: CreatePrivacyDto) {
    const privacy = await this.privacyRepo.save({ id: 1, ...data });
    return {
      id: privacy?.id,
      content: privacy?.content,
      content_ar: privacy?.content_ar,
    };
  }
}
