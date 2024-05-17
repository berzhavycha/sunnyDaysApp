import { Module } from '@nestjs/common';

import { AuthModule } from '@modules/auth';
import { CitiesModule } from '@modules/cities';
import { CitySearchModule } from '@modules/city-search';
import { ConfigModule } from '@modules/config';
import { DatabaseModule } from '@modules/database';
import { FeaturesModule } from '@modules/features';
import { GraphqlModule } from '@modules/graphql';
import { RedisModule } from '@modules/redis';
import { SubscriptionsModule } from '@modules/subscriptions';
import { UsersModule } from '@modules/users';
import { WeatherForecastModule } from '@modules/weather-forecast';
import { WeatherManagementModule } from '@modules/weather-management';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GraphqlModule,
    RedisModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    WeatherForecastModule,
    SubscriptionsModule,
    CitySearchModule,
    FeaturesModule,
    WeatherManagementModule,
  ],
})
export class AppModule {}
