const Joi = require("joi");

const envSchema = Joi.object({
    BASE_URL: Joi.string().required(),
    CITIES_SEARCH_LIMIT: Joi.number().default(5),
    CITIES_SEARCH_SORT: Joi.string().default("population"),
    CITIES_SEARCH_OFFSET: Joi.number().default(0),
    CITIES_SEARCH_MIN_POPULATION: Joi.number().default(1000),
    WEATHER_CITIES_LIMIT: Joi.number().default(10),
    WEATHER_CITIES_ORDER: Joi.string().default('ASC'),
    MAX_WEATHER_CITIES_AMOUNT: Joi.number().default(10),
    MAX_FORECAST_DAYS: Joi.number().default(3),
    FORECAST_DAYS_PER_SLIDE: Joi.number().default(3),
    WEATHER_FORECAST_CACHE_MINUTES_TIME: Joi.number().default(30),
    PASSWORD_MIN_LENGTH: Joi.number().default(8),
    FEATURE_CACHE_MINUTES_TIME: Joi.number().default(15)
})

module.exports = {
    envSchema
}