import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartSession } from './cart-session.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/products/entities/variant.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => CartSession, (session) => session.items)
  session: CartSession;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Variant)
  variant: Variant;
}
