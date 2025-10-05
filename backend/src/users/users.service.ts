import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserQueryDto } from './dto/query-user.dto';
import { Request } from 'express';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
  async findAll(query: UserQueryDto, req: Request) {
    const { role, search, page = '1', limit = '10' } = query ?? {};
    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;
    const qb = this.userRepository.createQueryBuilder('user');
    if (role) {
      qb.andWhere('user.role = :role', { role });
    }
    if (search) {
      qb.andWhere('(user.fullName ILIKE :search OR user.email ILIKE :search)', {
        search: `%${search}%`,
      });
    }
    const [results, count] = await qb
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();
    const data = results?.map((item) => {
      return plainToInstance(UserDto, item, { excludeExtraneousValues: true });
    });
    return new FullPaginationDto(currentPage, count, take, req, data);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
