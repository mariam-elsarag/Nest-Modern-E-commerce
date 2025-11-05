import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseAddressDto } from './dto/response-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async createOrUpdateAddress(body: CreateAddressDto, user: User) {
    let address = await this.addressRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (!address) {
      const missing = Object.entries(body)
        .filter(([_, v]) => !v)
        .map(([k]) => `${k} is required`);

      if (missing.length > 0) {
        throw new BadRequestException({
          message: 'Bad Request',
          errors: missing,
        });
      }

      address = this.addressRepo.create({ ...body, user });
    } else {
      Object.assign(address, body);
    }

    await this.addressRepo.save(address);
    const savedAddress = await this.addressRepo.findOne({
      where: { user: { id: user.id } },
    });

    return savedAddress ?? address;
  }
}
