import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Support } from './entities/support.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { AdminSupportResponseDto } from './dto/admin-response.dto';
import { FullPaginationDto } from 'src/common/pagination/pagination.dto';
import { NotFoundError } from 'rxjs';
import { TicketStatus } from 'src/common/utils/enum';
import { MailService } from 'src/mail/mail.service';
import { ReplyByAdminSupportDto } from './dto/reply-support-dto';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Support)
    private readonly supportRepo: Repository<Support>,
    private readonly mailService: MailService,
  ) {}
  // create new support ticket from user
  async create(createSupportDto: CreateSupportDto, user?: User) {
    const { fullName, email, subject, message } = createSupportDto;
    let name: string = fullName;
    let userEmail: string = email;

    if (!user?.id) {
      if (!fullName) {
        throw new BadRequestException('fullName should not be empty');
      }
      if (!email) {
        throw new BadRequestException('email should not be empty');
      }
    } else {
      name = fullName ?? user.fullName;
      userEmail = email ?? user.email;
    }
    const support = await this.supportRepo.create({
      fullName: name,
      email: userEmail,
      subject,
      message,
    });
    await this.supportRepo.save(support);
    return {
      fullName: support.fullName,
      email: support.email,
      subject: support.subject ?? '',
      message: support.message,
      createdAt: support.createdAt,
    };
  }

  /**
   *Admin reply
   * @param body
   * @param id
   * @returns
   */
  async adminReply(body: ReplyByAdminSupportDto, id: number) {
    const support = await this.findOne(id);
    const subject = support.subject ?? 'General Inquiry';
    support.adminReply = body.reply;
    await this.mailService.supportTicket(
      support.fullName,
      support.email,
      support.message,
      body.reply,
      subject,
    );
    support.repliedAt = new Date();
    const savedSupport = await this.supportRepo.save(support);
    return {
      message: 'Reply successfully sent to user',
      data: savedSupport,
    };
  }
  async findAll(query: PaginationQueryDto, req: Request) {
    const { search, page = '1', limit = '10' } = query;
    const currentPage = +page;
    const take = +limit;
    const skip = (currentPage - 1) * take;

    const qb = this.supportRepo.createQueryBuilder('support').withDeleted();

    if (search) {
      qb.andWhere(
        '(support.email ILIKE :search OR support.fullName ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const [results, count] = await qb
      .orderBy('support.deletedAt', 'ASC', 'NULLS FIRST')
      .addOrderBy('support.createdAt', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const data = results?.map((item) => {
      return plainToInstance(AdminSupportResponseDto, item, {
        excludeExtraneousValues: true,
      });
    });

    return new FullPaginationDto(currentPage, count, take, req, data);
  }

  async findOne(id: number) {
    const support = await this.supportRepo.findOneBy({ id });
    if (!support) {
      throw new NotFoundError('Support not found');
    }
    return support;
  }

  async update(id: number, body: UpdateSupportDto) {
    const support = await this.findOne(id);
    if (body.status || body.isRead) {
      if (body.status) {
        support.status = body.status;
        if (body.status === TicketStatus.Solved) {
          support.solvedAt = new Date();
        }
      }
      support.isRead = body.isRead ?? support.isRead;
      const savedSupport = await this.supportRepo.save(support);
      return savedSupport;
    } else {
      return support;
    }
  }

  async toggleRead(id: number) {
    const support = await this.findOne(id);
    support.isRead = !support.isRead;
    const savedSupport = await this.supportRepo.save(support);
    return savedSupport;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.supportRepo.softDelete(id);
    return `Support has been deleted successfully`;
  }
  async restore(id: number) {
    await this.supportRepo.restore(id);

    return { message: `Successfully restore support ticket` };
  }
}
