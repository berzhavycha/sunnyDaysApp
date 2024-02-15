const Joi = require("joi");

const envSchema = Joi.object({
    BASE_URL: Joi.string().required(),
    FETCH_CITY_AUTOCOMPLETE_LIMIT: Joi.number().default(5),
    FETCH_CITY_AUTOCOMPLETE_SORT: Joi.string().default("population"),
    FETCH_CITY_AUTOCOMPLETE_OFFSET: Joi.number().default(0),
    MAX_WEATHER_CITIES_AMOUNT: Joi.number().default(10),
    MAX_FORECAST_DAYS: Joi.number().default(3),
    WEATHER_FORECAST_CACHE_MINUTES_TIME: Joi.number().default(30),
    PASSWORD_MIN_LENGTH: Joi.number().default(8),
})

module.exports = {
    envSchema
}