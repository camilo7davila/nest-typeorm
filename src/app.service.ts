import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from "@nestjs/config";
import { Client } from 'pg';

import config from "./config";

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private API_KEY: string,
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private TASKS: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey
    const databaseName = this.configService.database.name
    return `Hello Wolrd! ${apiKey} and db ${databaseName}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    })
  }
}
