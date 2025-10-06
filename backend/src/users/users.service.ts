import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserQueryDto } from './dto/query-user.dto';
import { Request } from 'express';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';

import { AccountStatus, UserRole } from 'src/common/utils/enum';

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

  async userDetails(id: number) {
    const user = await this.findOne(id);
    return { ...user };
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

  /**
   * Update user data by admin
   * @param id
   * @param body
   * @returns
   */
  async updateUserInfo(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);

    let emailChanged = false;

    for (const [key, value] of Object.entries(body)) {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === user[key]
      ) {
        continue;
      }
      if (key === 'email') {
        const isExist = await this.userRepository.findOne({
          where: { email: value.toLowerCase() },
        });

        if (isExist && isExist.id !== id) {
          throw new BadRequestException({
            message: 'Email already exists',
            error: { email: 'Email already exists' },
          });
        }

        emailChanged = true;
      }
      if (key === 'phone') {
        const isExist = await this.userRepository.findOne({
          where: { phone: value },
        });

        if (isExist && isExist.id !== id) {
          throw new BadRequestException({
            message: 'Phone number already exists',
            error: { phone: 'Phone number already exists' },
          });
        }
      }

      user[key] = value;
    }
    if (
      emailChanged &&
      user.role === UserRole.User &&
      user.status === AccountStatus.Active &&
      body.status === undefined
    ) {
      user.status = AccountStatus.Pending;
    }

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
