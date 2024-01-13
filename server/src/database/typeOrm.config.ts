import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { City } from '../cities/entities/city.entity';
import { User } from '@users'; 
import { Subscription } from '../subscriptions/entities/subscription.entity';

config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [User, City, Subscription],
  migrations: ['./migrations/*.ts'],
});