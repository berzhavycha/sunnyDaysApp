import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeOrm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async () => ({
        ...typeOrmConfig as TypeOrmModuleAsyncOptions
      })
    }),
  ],
})

export class DatabaseModule { }