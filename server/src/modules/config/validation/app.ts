import * as Joi from 'joi';

export const appValidationSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  CORS_ORIGIN: Joi.string().required(),
  LOGIN_FIELD: Joi.string().default('email'),
  PORT: Joi.number().default(4000),
  COOKIE_EXPIRATION_DAYS_TIME: Joi.number().default(30),
  FEATURES_MANAGER_KEY: Joi.string().required(),
});
