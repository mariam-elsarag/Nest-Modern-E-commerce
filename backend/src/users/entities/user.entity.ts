import { Address } from 'src/address/entities/address.entity';
import { AccountStatus, UserRole } from 'src/common/utils/enum';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  fullName: string;

  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Index()
  @Column({ type: 'varchar', length: 13, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true, default: null })
  avatar: string | null;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.Pending,
  })
  status: AccountStatus;

  @Column({ type: 'boolean', default: false })
  isPasswordReset: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  passwordChangedAt: Date | null;

  @Column({ type: 'varchar', length: 60, default: null })
  otp: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  otpExpiredAt: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Order, (item) => item.user, { cascade: true })
  orders: Order[];

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  address: Address;
}
