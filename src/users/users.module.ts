import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-product.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem])
  ],
  controllers: [
    UsersController,
    CustomersController
  ],
  providers: [
    UsersService,
    CustomersService
  ]
})
export class UsersModule {}
