import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule, JwtAuthGuard } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { SubscriptionsModule } from '@modules/subscriptions';
import { WeatherForecastModule } from '@modules/weather-forecast';
import { CustomConfigModule } from '@modules/config';
import { TypeormModule } from '@modules/typeorm';
import { GraphqlModule } from '@modules/graphql';
import { RedisModule } from '@modules/redis';

@Module({
  imports: [
    CustomConfigModule,
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    WeatherForecastModule,
    TypeormModule,
    GraphqlModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
