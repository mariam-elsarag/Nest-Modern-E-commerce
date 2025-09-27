import { AccountStatus, UserRole } from 'src/utils/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  fullName: string;

  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Index()
  @Column({ type: 'varchar', length: 13, unique: true })
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

  @Column({ type: 'varchar', length: 60, nullable: true })
  password: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  passwordChangedAt: Date | null;

  @Column({ type: 'varchar', length: 60, default: null })
  otp: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  otpExpiredAt: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
