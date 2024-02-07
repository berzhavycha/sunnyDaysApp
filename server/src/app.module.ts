import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule, JwtAuthGuard } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { SubscriptionsModule } from '@modules/subscriptions';
import { WeatherForecastModule } from '@modules/weather-forecast';
import { ConfigModule } from '@modules/config';
import { TypeormModule } from '@modules/typeorm';
import { GraphqlModule } from '@modules/graphql';
import { RedisModule } from '@modules/redis';
import { CitiesModule } from '@modules/cities';

@Module({
  imports: [
    TypeormModule,
    ConfigModule,
    GraphqlModule,
    RedisModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    WeatherForecastModule,
    SubscriptionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
