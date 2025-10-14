import { Category } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Color } from '../../colors/entities/color.entity';
import { Size } from '../../sizes/entities/size.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 155 })
  title: string;

  @Column({ type: 'varchar', length: 155 })
  title_ar: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  description_ar: string;

  @Column({ type: 'varchar' })
  cover: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'boolean', default: true })
  isAvalible: boolean;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'boolean', default: false })
  hasTax: boolean;

  @Column({ type: 'boolean', default: false })
  defaultTax: boolean;

  @Column({ type: 'int', default: 0 })
  taxRate: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_categories',
  })
  categories: Category[];

  @ManyToMany(() => Color, (color) => color.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_colors',
  })
  colors: Color[];

  @ManyToMany(() => Size, (size) => size.products, {
    cascade: true,
  })
  @JoinTable({
    name: 'product_sizes',
  })
  sizes: Size[];
}
