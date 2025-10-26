import { Category } from '../../category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Variant } from './variant.entity';

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

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'int', default: 0 })
  reviewCount: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

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

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: true,
    eager: true,
  })
  variants: Variant[];
}
