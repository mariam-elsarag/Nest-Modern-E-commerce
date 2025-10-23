import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('faq')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  question: string;

  @Column({ type: 'varchar', length: 100 })
  question_ar: string;

  @Column({ type: 'varchar', length: 255 })
  answer: string;

  @Column({ type: 'varchar', length: 255 })
  answer_ar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
