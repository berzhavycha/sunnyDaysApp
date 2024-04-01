import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { redisConfig } from './configs';

@Module({
  imports: [CacheModule.registerAsync(redisConfig)],
})
export class RedisModule {}
