import * as Joi from 'joi';

export const validationSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  JWT_ACCESS_TOKEN_TIME: Joi.string().default('15s'),
  JWT_REFRESH_TOKEN_TIME: Joi.string().default('30d'),
  LOGIN_FIELD: Joi.string().default('email'),
  PORT: Joi.number().default(4000),
  PASSWORD_MIN_LENGTH: Joi.number().default(8),
  WEATHER_API_KEY: Joi.string().required(),
  WEATHER_API_BASE_URL: Joi.string().required(),
  COOKIE_EXPIRATION_DAYS_TIME: Joi.number().default(30),
  REDIS_WEATHER_DATA_TTL_SECONDS: Joi.number().default(1800),
  REDIS_DEFAULT_TTL_SECONDS: Joi.number().default(1800)
})