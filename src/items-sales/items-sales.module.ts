import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemSales } from "./models/entity/items-sale.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { SharedModule } from "src/shared/shared.module";
import { ProductsModule } from "src/products/products.module";
import { SalesModule } from "src/sales/sales.module";
import { CreateItemSaleController } from "./use-cases/create-item-sale/create-item-sale.controller";
import { FindItemSaleController } from "./use-cases/find-item-sale/find-item-sale.controller";
import { FindAllItemSaleController } from "./use-cases/find-all-item-sale-filtered/find-all-item-sale.controller";
import { UpdateItemSaleController } from "./use-cases/update-item-sale/update-item-sale.controller";
import { DeleteItemSaleController } from "./use-cases/delete-item-sale/delete-item-sale.controller";
import { CreateItemSaleUseCase } from "./use-cases/create-item-sale/create-item-sale.service";
import { FindItemSaleUseCase } from "./use-cases/find-item-sale/find-item-sale.service";
import { FindAllItemSaleUseCase } from "./use-cases/find-all-item-sale-filtered/find-all-item-sale.service";
import { UpdateItemSaleUseCase } from "./use-cases/update-item-sale/update-item-sale.service";
import { DeleteItemSaleUseCase } from "./use-cases/delete-item-sale/delete-item-sale.service";
import { ItemSalesRepository } from "./models/repository/item-sales.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemSales], DB_PG_DATABASE),
    SharedModule,
    ProductsModule,
    forwardRef(() => SalesModule),
  ],
  controllers: [
    CreateItemSaleController,
    FindAllItemSaleController,
    FindItemSaleController,
    UpdateItemSaleController,
    DeleteItemSaleController,
  ],
  providers: [
    CreateItemSaleUseCase,
    FindAllItemSaleUseCase,
    FindItemSaleUseCase,
    UpdateItemSaleUseCase,
    DeleteItemSaleUseCase,
    ItemSalesRepository,
    {
      provide: "IItemSaleRepo",
      useExisting: ItemSalesRepository,
    },
  ],
  exports: ["IItemSaleRepo"],
})
export class ItemSalesModule {}
