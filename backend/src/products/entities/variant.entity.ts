import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Size } from 'src/sizes/entities/size.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  reserved: number;

  @ManyToOne(() => Color, { eager: true, nullable: true })
  color: Color;

  @ManyToOne(() => Size, { eager: true, nullable: true })
  size: Size;
}
