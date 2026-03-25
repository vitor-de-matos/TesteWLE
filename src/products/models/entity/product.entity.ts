import { ItemSales } from "src/items-sales/models/entity/items-sale.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "product" })
export class Product {
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

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "description", type: "varchar" })
  description: string;

  @Column({ name: "price", type: "numeric" })
  price: number;

  @Column({ name: "stock_quantity", type: "int" })
  stockQuantity: number;

  @OneToMany(() => ItemSales, (ItemSales) => ItemSales.product)
  itemSales: ItemSales[];
}
