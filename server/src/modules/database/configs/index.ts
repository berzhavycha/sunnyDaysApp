import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const typeOrmConfigOptions = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres' as const,
      host: configService.get<string>('POSTGRES_HOST'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DB'),
      entities: ['dist/**/*.entity{.js,.ts}'],
      autoLoadEntities: true,
      migrations: ['dist/modules/database/migrations/*.js'],
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
