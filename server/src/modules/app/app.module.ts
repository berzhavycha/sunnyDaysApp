import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { graphqlConfigAsync, redisConfig, typeOrmConfig } from '@configs';
import { AuthModule, JwtAuthGuard } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { SubscriptionsModule } from '@modules/subscriptions';
import { WeatherForecastModule } from '@modules/weather-forecast';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    GraphQLModule.forRootAsync(graphqlConfigAsync),
    CacheModule.registerAsync(redisConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    WeatherForecastModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
