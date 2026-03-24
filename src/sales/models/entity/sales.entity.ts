import { DB_PG_SCHEMA } from 'src/shared/database/postgres.config';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sales' })
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'sale_date',
    type: 'timestamptz',
    default: () => 'now()',
  })
  saleDate: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column({ name: 'total_value', type: 'numeric' })
  totalValue: number;
}
