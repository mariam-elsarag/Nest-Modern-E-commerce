import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('privacy')
export class Privacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  content_ar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
