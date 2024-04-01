import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule, JwtAuthGuard } from '@modules/auth';
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
