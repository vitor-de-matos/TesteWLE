import { Product } from 'src/products/models/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ManyToOne } from 'typeorm/browser';

@Entity({ name: 'items_sales' })
export class ItemSales {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column({ name: 'item_quantity', type: 'number' })
  itemQuantity: number;

  @Column({ name: 'unity_value', type: 'numeric' })
  unityValue: number;

  @Column({ name: 'total_value', type: 'numeric' })
  totalValue: number;

  @ManyToOne(() => Product, (itemSales) => itemSales.itemSales, {
    nullable: false,
  })
  @JoinColumn({ name: 'item_sale_id' })
  product: Product[];
}
