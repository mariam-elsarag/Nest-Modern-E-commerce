import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';
import { DeleteColorDto } from './dto/delete-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}
  async create(body: CreateColorDto) {
    const color = await this.colorRepository.save(body);
    return color;
  }

  async findAll() {
    const colors = await this.colorRepository.find();
    return colors;
  }

  async remove(body: DeleteColorDto) {
    const { ids } = body;
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No IDs provided');
    }
    await this.colorRepository.delete(ids);
  }
}
