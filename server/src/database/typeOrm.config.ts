import { DataSource, DataSourceOptions } from "typeorm";
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from '../global';

export const typeOrmConfig = {
  type: 'postgres',
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [],
  autoLoadEntities: true,
  migrations: ['./migrations/*.ts'],
  synchronize: true,
};

export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions);