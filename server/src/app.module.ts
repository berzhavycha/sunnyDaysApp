import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager'
import { graphqlConfigAsync, RedisOptions } from '@configs'
import { AuthModule, JwtAuthGuard } from '@auth';
import { UsersModule } from '@users';
import { APP_GUARD } from '@nestjs/core';
import dotenv from "dotenv";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from '@configs';
import { CitiesModule } from './cities/cities.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

dotenv.config({ path: "./.env" });

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRootAsync(graphqlConfigAsync),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...typeOrmConfig as TypeOrmModuleAsyncOptions
      })
    }),
    AuthModule,
    UsersModule,
    CitiesModule,
    SubscriptionsModule,
  ],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
