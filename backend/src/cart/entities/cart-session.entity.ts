import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cart-items.entity';

@Entity('cart_sessions')
export class CartSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @Column({ type: 'varchar', nullable: true })
  cartToken?: string | null;

  @OneToMany(() => CartItem, (item) => item.session, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  items: CartItem[];

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;
}
