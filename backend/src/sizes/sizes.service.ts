import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size) private readonly sizeRepository: Repository<Size>,
  ) {}
  async create(createSizeDto: CreateSizeDto) {
    const size = await this.sizeRepository.save(createSizeDto);
    return { id: size?.id, label: size?.label };
  }

  async findAll() {
    const sizes = await this.sizeRepository.find();
    const sizeArray = sizes?.map(({ id, label }) => ({ id, label }));
    return sizeArray;
  }

  async findOne(id: number) {
    const size = await this.sizeRepository.findOneBy({ id });
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return { id: size?.id, label: size?.label };
  }

  async update(id: number, body: UpdateSizeDto) {
    const size = await this.findOne(id);
    Object.entries(body).forEach(([key, value]) => {
      if (value) {
        size[key] = value;
      }
    });
    const savedSize = await this.sizeRepository.save(size);
    return { id: savedSize?.id, label: savedSize.label };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.sizeRepository.delete(id);
  }
}
