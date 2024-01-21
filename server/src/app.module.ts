import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { CacheModule } from "@nestjs/cache-manager";
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from "@nestjs/core";
import { AppService } from "./app.service";
import { AppResolver } from "./app.resolver";
import { graphqlConfigAsync, redisOptions, typeOrmOptions } from "@configs";
import { AuthModule, JwtAuthGuard } from "@auth";
import { UsersModule } from "@users";
import { SubscriptionsModule } from '@subscriptions';
import { CitiesModule } from '@cities';

@Module({
  imports: [
    CacheModule.registerAsync(redisOptions),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: "../.env" }),
    GraphQLModule.forRootAsync(graphqlConfigAsync),
    TypeOrmModule.forRootAsync(typeOrmOptions),
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
