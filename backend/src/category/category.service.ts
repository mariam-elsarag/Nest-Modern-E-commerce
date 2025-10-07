import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(body: CreateCategoryDto) {
    const category = await this.categoryRepository.save(body);
    return category;
  }

  async findAll(query: PaginationQueryDto, req: Request) {
    const { page = '1', limit = '10' } = query ?? {};
    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;
    const qb = this.categoryRepository.createQueryBuilder('category');
    const [results, count] = await qb
      .orderBy('category.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();
    return new FullPaginationDto(currentPage, count, take, req, results);
  }

  async findAllWithoutPagination() {
    const categories = await this.categoryRepository.find();
    return categories;
  }
  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, body: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.entries(body).forEach(([key, value]) => {
      if (value) {
        category[key] = value;
      }
    });
    await this.categoryRepository.save(category);
    return category;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }
}
