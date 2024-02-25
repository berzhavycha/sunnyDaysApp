import * as Joi from 'joi';

export const citySearchValidationSchema = Joi.object({
  SEARCH_CITIES_API_BASE_URL: Joi.string().required(),
  SEARCH_CITIES_API_KEY: Joi.string().required(),
  SEARCH_CITIES_API_HOST: Joi.string().required(),
  SEARCH_CITIES_MAX_CITIES_LIMIT: Joi.number().default(10),
});
