import { REDIS_HOST, REDIS_PORT } from "@global";
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [ConfigModule],
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
    inject: [ConfigService],
};