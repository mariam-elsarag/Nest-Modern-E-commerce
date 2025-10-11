import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Size } from 'src/sizes/entities/size.entity';

@Entity('variant')
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar' })
  sku: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @ManyToOne(() => Color, (color) => color.variants)
  color: Color;

  @ManyToOne(() => Size, (size) => size.variants, { onDelete: 'SET NULL' })
  size: Size;
}
