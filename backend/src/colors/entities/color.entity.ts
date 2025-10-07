import { Variant } from 'src/products/entities/product-variant.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  name_ar: string;

  @Column({ type: 'varchar', length: 9, unique: true })
  color: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Variant, (varinat) => varinat.color)
  variants: Variant[];
}
