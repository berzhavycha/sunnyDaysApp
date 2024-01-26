import { DataSource, DataSourceOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  TYPEORM_TYPE,
} from '../../global';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig = {
  type: TYPEORM_TYPE,
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  autoLoadEntities: true,
  migrations: ['dist/typeorm/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async () => ({
    ...(typeOrmConfig as TypeOrmModuleAsyncOptions),
  }),
};
