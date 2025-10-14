import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { In, Repository } from 'typeorm';
import { FindSizeDto } from './dto/find-size.dto';

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

  async findProductSizes() {
    const sizes = await this.sizeRepository
      .createQueryBuilder('sizes')
      .innerJoin('sizes.products', 'products')
      .distinct(true)
      .getMany();

    return sizes;
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

  async checkSizeExist(body: FindSizeDto) {
    const { size } = body;

    const sizes = await this.sizeRepository.find({
      where: { id: In(size) },
    });
    const foundIds = sizes.map((size) => size.id);
    const missingIds = size.filter((id) => !foundIds.includes(id));
    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Sizes not found for IDs: ${missingIds.join(', ')}`,
      );
    }

    return sizes;
  }
}
