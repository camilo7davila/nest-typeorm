import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';

import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductService } from './services/product.service';

import { Product } from './entities/product.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand, Category])
  ],
  controllers: [
    ProductsController,
    CategoriesController,
    BrandsController
  ],
  providers: [
    ProductService,
    CategoriesService,
    BrandsService
  ],
  exports: [
    ProductService
  ]
})
export class ProductsModule {}
