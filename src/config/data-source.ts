import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Task } from '../tasks/task.model';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [Task],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
}); 