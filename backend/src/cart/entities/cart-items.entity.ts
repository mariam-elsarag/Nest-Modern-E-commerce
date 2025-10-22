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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  vatRate: number;

  @Column({ default: true })
  isValid: boolean;

  @ManyToOne(() => CartSession, (session) => session.items)
  session: CartSession;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Variant)
  variant: Variant;

  // derived
  get priceWithVat(): number {
    return Number(this.price) * (1 + Number(this.vatRate) / 100);
  }

  get totalWithVat(): number {
    return this.priceWithVat * this.quantity;
  }
}
