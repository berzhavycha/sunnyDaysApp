import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { redisConfig } from './configs';

@Module({
  imports: [CacheModule.registerAsync(redisConfig)],
  exports: [CacheModule],
})
export class RedisModule {}
