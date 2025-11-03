import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/users/entities/user.entity';

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
      address = this.addressRepo.create({ ...body, user });
    } else {
      Object.assign(address, body);
    }

    return await this.addressRepo.save(address);
  }
}
