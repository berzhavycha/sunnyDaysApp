import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const typeOrmConfigOptions = {
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres' as const,
      host: configService.get<string>('POSTGRES_HOST'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DB'),
      autoLoadEntities: true,
      migrations: ['dist/src/migrations/*{.ts,.js}'],
      synchronize: false,
    };
  },
};

export const connectionSource = new DataSource(
  typeOrmConfigOptions.useFactory(new ConfigService()) as DataSourceOptions,
);

export const typeOrmConfig = {
  imports: [ConfigModule],
  useFactory: typeOrmConfigOptions.useFactory,
  inject: [ConfigService],
};
