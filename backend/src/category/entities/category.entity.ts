import { Product } from '../../products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  title_ar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
