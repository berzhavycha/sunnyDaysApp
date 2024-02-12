import * as Joi from 'joi';

export const geodbValidationSchema = Joi.object({
    GEODB_API_BASE_URL: Joi.string().required(),
    GEODB_API_KEY: Joi.string().required(),
    GEODB_API_HOST: Joi.string().required(),
    GEODB_MAX_CITIES_LIMIT: Joi.number().default(10)
});
