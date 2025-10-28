import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order-item')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
