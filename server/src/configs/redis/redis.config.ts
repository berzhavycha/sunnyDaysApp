import { REDIS_HOST, REDIS_PORT } from "@global";
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";

export const redisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT),
      },
    });
    return {
      store: () => store,
    };
  },
};
