import { TicketStatus } from 'src/common/utils/enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('support')
export class Support {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.Open })
  status: TicketStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subject?: string;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'text', nullable: true })
  adminReply?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  repliedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  solvedAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  attachment: string | null;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, { nullable: true })
  user?: User;
}
