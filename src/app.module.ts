import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { firstValueFrom } from 'rxjs';
import * as Joi from 'joi';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required()
      })
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await firstValueFrom(http.get('https://jsonplaceholder.typicode.com/todos'));
        return tasks.data;
      },
      inject: [HttpService]
    }
  ],
})
export class AppModule { }
