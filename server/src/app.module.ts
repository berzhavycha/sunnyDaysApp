import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule, JwtAuthGuard } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { SubscriptionsModule } from '@modules/subscriptions';
import { WeatherForecastModule } from '@modules/weather-forecast';
import { ConfigModule } from '@modules/config';
import { DatabaseModule } from '@modules/database';
import { GraphqlModule } from '@modules/graphql';
import { RedisModule } from '@modules/redis';
import { CitiesModule } from '@modules/cities';
import { GeodbModule } from './modules/geodb/geodb.module';

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
    GeodbModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
