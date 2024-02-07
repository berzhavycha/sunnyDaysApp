import * as Joi from 'joi';

export const weatherApiValidationSchema = Joi.object({
    WEATHER_API_KEY: Joi.string().required(),
    WEATHER_API_BASE_URL: Joi.string().required(),
})