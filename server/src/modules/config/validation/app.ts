import * as Joi from 'joi';

export const appValidationSchema = Joi.object({
  LOGIN_FIELD: Joi.string().default('email'),
  PORT: Joi.number().default(4000),
  COOKIE_EXPIRATION_DAYS_TIME: Joi.number().default(30),
});
