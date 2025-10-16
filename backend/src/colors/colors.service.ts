import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { In, Repository } from 'typeorm';
import { DeleteColorDto } from './dto/delete-color.dto';
import { plainToInstance } from 'class-transformer';
import { ColorResponseDto } from './dto/response-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async findOne(id: number) {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    return plainToInstance(ColorResponseDto, color, {
      excludeExtraneousValues: true,
    });
  }

  async create(body: CreateColorDto) {
    const color = await this.colorRepository.save(body);
    return color;
  }

  async findAll() {
    const colors = await this.colorRepository.find();
    return colors;
  }
  async findProductColors() {
    const colors = await this.colorRepository
      .createQueryBuilder('colors')
      .innerJoin('colors.products', 'products')
      .distinct(true)
      .getMany();
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
