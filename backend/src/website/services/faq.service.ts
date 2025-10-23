import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from '../entities/faq.entity';
import { Repository } from 'typeorm';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class FaqServices {
  constructor(
    @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>,
  ) {}

  async create(body: CreateFaqDto) {
    const faq = await this.faqRepo.save(body);
    return faq;
  }

  async findOne(id: number) {
    const faq = await this.faqRepo.findOneBy({ id });
    if (!faq) {
      throw new NotFoundException('Faq not found');
    }
    return faq;
  }

  async update(body: UpdateFaqDto, id: number) {
    const faq = await this.findOne(id);
    Object.assign(
      faq,
      Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v !== undefined),
      ),
    );
    if (body.answer || body.question) {
      await this.faqRepo.save(faq);
    }
    return faq;
  }

  async findAll() {
    const faq = await this.faqRepo.find({ order: { createdAt: 'DESC' } });
    return faq;
  }

  async findAllAdmin(query: PaginationQueryDto, req: Request) {
    const { search, page = '1', limit = '10' } = query;
    const currentPage = +page;
    const take = +limit;
    const skip = (currentPage - 1) * take;

    const qb = this.faqRepo.createQueryBuilder('faq');

    if (search) {
      qb.andWhere(
        `(faq.question ILIKE :search OR faq.question_ar ILIKE :search)`,
        {
          search: `%${search}%`,
        },
      );
    }

    const [results, count] = await qb
      .orderBy('faq.createdAt', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return new FullPaginationDto(currentPage, count, take, req, results);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.faqRepo.delete({ id });
    return `This action removes a #${id} faq`;
  }
}
