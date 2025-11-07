import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from '../../colors/entities/color.entity';
import { Size } from '../../sizes/entities/size.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

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

  @OneToMany(() => Favorite, (favorite) => favorite.variant)
  favorites: Favorite[];
}
