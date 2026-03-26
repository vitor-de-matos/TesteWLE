import { Product } from "src/products/models/entity/product.entity";
import { Sales } from "src/sales/models/entity/sales.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "items_sales" })
export class ItemSales {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "now()",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "update_at",
    type: "timestamptz",
    default: () => "now()",
  })
  updatedAt: Date;

  @Column({ name: "item_quantity", type: "int" })
  itemQuantity: number;

  @Column({ name: "unity_value", type: "numeric" })
  unityValue: number;

  @Column({ name: "total_value", type: "numeric" })
  totalValue: number;

  @ManyToOne(() => Product, (product) => product.itemSales, {
    nullable: false,
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Sales, (sales) => sales.itemSales, {
    nullable: false,
  })
  @JoinColumn({ name: "sales_id" })
  sales: Sales;
}
