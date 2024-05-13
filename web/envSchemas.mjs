import Joi from 'joi';

export const clientSchema = Joi.object({
    NEXT_PUBLIC_BASE_URL: Joi.string().required(),
    NEXT_PUBLIC_CITIES_SEARCH_LIMIT: Joi.number().default(5),
    NEXT_PUBLIC_CITIES_SEARCH_SORT: Joi.string().default("population"),
    NEXT_PUBLIC_CITIES_SEARCH_OFFSET: Joi.number().default(0),
    NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION: Joi.number().default(1000),
    NEXT_PUBLIC_WEATHER_CITIES_LIMIT: Joi.number().default(10),
    NEXT_PUBLIC_WEATHER_CITIES_ORDER: Joi.string().default('ASC'),
    NEXT_PUBLIC_MAX_WEATHER_CITIES_AMOUNT: Joi.number().default(10),
    NEXT_PUBLIC_MAX_FORECAST_DAYS: Joi.number().default(3),
    NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE: Joi.number().default(3),
    NEXT_PUBLIC_DYNAMIC_CACHE_SECONDS_TIME: Joi.number().default(60),
    NEXT_PUBLIC_STATIC_CACHE_SECONDS_TIME: Joi.number().default(900),
    NEXT_PUBLIC_PASSWORD_MIN_LENGTH: Joi.number().default(8),
    NEXT_PUBLIC_FEATURE_CACHE_SECONDS_TIME: Joi.number().default(900),
    NEXT_PUBLIC_TEMP_UNIT_COOKIE_EXPIRATION_DAYS_TIME: Joi.number().default(90)
});

export const serverSchema = Joi.object({
    NODE_ENV: Joi.string().default('development'),
    COOKIE_EXPIRATION_DAYS_TIME: Joi.number().default(90)
});
