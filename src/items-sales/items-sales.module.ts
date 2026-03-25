import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemSales } from "./models/entity/items-sale.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSales], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [],
})
export class ItemsSalesModule {}
