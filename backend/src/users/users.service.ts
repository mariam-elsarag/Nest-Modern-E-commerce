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

import { AccountStatus } from 'src/common/utils/enum';

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
    return user;
  }

  /**
   * Get all users
   * @param query (limit, page, search, role)
   * @param req
   * @param email
   * @returns
   */
  async findAll(query: UserQueryDto, req: Request, email: string) {
    const { role, search, page = '1', limit = '10' } = query ?? {};
    const currentPage = parseInt(page, 10);
    const take = parseInt(limit, 10);
    const skip = (currentPage - 1) * take;
    const qb = this.userRepository.createQueryBuilder('user');
    qb.andWhere('user.email != :email', { email });
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
  async updateUserInfo(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.entries(body).forEach(([key, value]) => {
      if (value) {
        user[key] = value;
      }
    });
    await this.userRepository.save(user);
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
