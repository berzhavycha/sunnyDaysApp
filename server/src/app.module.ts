import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { CacheModule } from '@nestjs/cache-manager'
import { graphqlConfigAsync, RedisOptions } from '@configs'
import { AuthModule } from '@auth';
import { UsersModule } from '@users';
import { DatabaseModule } from '@database';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    GraphQLModule.forRootAsync(graphqlConfigAsync),
    AuthModule,
    UsersModule,
    DatabaseModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule { }
