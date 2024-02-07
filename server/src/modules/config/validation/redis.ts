import * as Joi from 'joi';

export const redisValidationSchema = Joi.object({
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_WEATHER_DATA_TTL_SECONDS: Joi.number().default(1800),
    REDIS_DEFAULT_TTL_SECONDS: Joi.number().default(1800)
})