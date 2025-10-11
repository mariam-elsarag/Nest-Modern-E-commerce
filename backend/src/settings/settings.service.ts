import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/settings.entity';
import { Repository } from 'typeorm';
import { CreateOrUpdateDto } from './dto/create-update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async updateOrCreateSetting(data: CreateOrUpdateDto) {
    const setting = await this.settingRepository.save({ id: 1, ...data });
    return {
      id: setting?.id,
      taxRate: setting?.taxRate ?? 0,
      monthlyOrderGoal: setting?.monthlyOrderGoal ?? 0,
    };
  }

  async findOne() {
    const setting = await this.settingRepository.findOneBy({ id: 1 });
    return {
      id: setting?.id ?? 1,
      taxRate: setting?.taxRate ?? 0,
      monthlyOrderGoal: setting?.monthlyOrderGoal ?? 0,
    };
  }
}
