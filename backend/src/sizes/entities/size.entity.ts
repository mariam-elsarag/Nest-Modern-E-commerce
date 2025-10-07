import { Variant } from 'src/products/entities/product-variant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  label: string;

  @OneToMany(() => Variant, (variant) => variant.size)
  variants: Variant[];
}
