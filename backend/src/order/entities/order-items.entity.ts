import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Variant } from '../../products/entities/variant.entity';
import { Product } from '../../products/entities/product.entity';
import { OrderStatus } from '../../common/utils/enum';

@Entity('order-item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Variant)
  variant: Variant;

  @ManyToOne(() => Order, (item) => item.items)
  order: Order;

  @CreateDateColumn()
  createdAt: Date;
}
