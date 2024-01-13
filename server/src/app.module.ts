import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config'
import { CitiesModule } from './cities/cities.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager'
import { graphqlConfigAsync } from './configs/graphql/graphql.config'
import { RedisOptions } from './configs/redis/cache.config';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRootAsync(graphqlConfigAsync),
    AuthModule,
    UsersModule,
    CitiesModule,
    SubscriptionsModule,
    DatabaseModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule { }
