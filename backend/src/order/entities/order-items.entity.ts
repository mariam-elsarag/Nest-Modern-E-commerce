import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Variant } from 'src/products/entities/variant.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('order-item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Variant)
  variant: Variant;

  @ManyToOne(() => Order, (item) => item.items)
  order: Order;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
