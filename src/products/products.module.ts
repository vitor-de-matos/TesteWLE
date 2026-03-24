import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/entity/product.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { SharedModule } from 'src/shared/shared.module';
import { CreateProductController } from './use-cases/create-product/create-product.controller';
import { FindProductController } from './use-cases/find-product/find-product.controller';
import { FindAllProductController } from './use-cases/find-all-products/find-all-products.controller';
import { UpdateProductController } from './use-cases/update-product/update-product.controller';
import { DeleteProductController } from './use-cases/delete-product/delete-product.controller';
import { CreateProductUseCase } from './use-cases/create-product/create-product.service';
import { FindProductUseCase } from './use-cases/find-product/find-product.service';
import { FindAllProductUseCase } from './use-cases/find-all-products/find-all-products.service';
import { UpdateProductUseCase } from './use-cases/update-product/update-product.service';
import { DeleteProductUseCase } from './use-cases/delete-product/delete-product.service';
import { ProductRepository } from './models/repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product], DB_PG_DATABASE), SharedModule],
  controllers: [
    CreateProductController,
    FindProductController,
    FindAllProductController,
    UpdateProductController,
    DeleteProductController,
  ],
  providers: [
    CreateProductUseCase,
    FindProductUseCase,
    FindAllProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    ProductRepository,
    {
      provide: 'IProductRepo',
      useExisting: ProductRepository,
    },
  ],
  exports: ['IProductRepo'],
})
export class ProductsModule {}
