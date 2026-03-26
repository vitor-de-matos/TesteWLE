import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./models/entity/sales.entity";
import { DB_PG_DATABASE } from "src/shared/database/postgres.config";
import { SharedModule } from "src/shared/shared.module";
import { SalesRepository } from "./models/repository/sales.repository";
import { CreateSaleController } from "./use-cases/create-sales/create-sales.controller";
import { FindSaleController } from "./use-cases/find-sales/find-sales.controller";
import { FindAllSaleController } from "./use-cases/find-all-sales-filtered/find-all-sales.controller";
import { DeleteSaleController } from "./use-cases/delete-sales/delete-sales.controller";
import { CreateSaleUseCase } from "./use-cases/create-sales/create-sales.service";
import { FindSaleUseCase } from "./use-cases/find-sales/find-sales.service";
import { FindAllSaleUseCase } from "./use-cases/find-all-sales-filtered/find-all-sales.use-case";
import { DeleteSaleUseCase } from "./use-cases/delete-sales/delete-sales.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sales], DB_PG_DATABASE), SharedModule],
  controllers: [
    CreateSaleController,
    FindSaleController,
    FindAllSaleController,
    DeleteSaleController,
  ],
  providers: [
    CreateSaleUseCase,
    FindSaleUseCase,
    FindAllSaleUseCase,
    DeleteSaleUseCase,
    SalesRepository,
    { provide: "ISalesRepo", useExisting: SalesRepository },
  ],
  exports: ["ISalesRepo"],
})
export class SalesModule {}
