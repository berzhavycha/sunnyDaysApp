import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  exports: [TypeOrmModule],
})
export class TypeormModule {}
