import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm/driver/types/DatabaseType';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_Type as DatabaseType,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  extra: {
    rejectUnauthorized: false,
  },
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  logging: false,
  subscribers: [],
  migrations: ['dist/migrations/*.js'],
} as DataSourceOptions;
const database = new DataSource(dataSourceOptions);
export default database;
