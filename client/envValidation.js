const Joi = require("joi");
const path = require("path");
// eslint-disable-next-line no-undef
const envPath = path.resolve(__dirname, `.env`);

require("dotenv").config({
    path: envPath,
});

const client = Joi.object({
    GRAPHQL_BASE_URL: Joi.string().required(),
    FETCH_CITY_AUTOCOMPLETE_AMOUNT: Joi.number().default(5),
    FETCH_CITY_AUTOCOMPLETE_SORT: Joi.string().default("population"),
    FETCH_CITY_AUTOCOMPLETE_OFFSET: Joi.number().default(0),
    MAX_WEATHER_CITIES_AMOUNT: Joi.number().default(10),
    MAX_FORECAST_DAYS: Joi.number().default(10),
    WEATHER_FORECAST_CACHE_TIME: Joi.number().default(1800),
    PASSWORD_MIN_LENGTH: Joi.number().default(8),
})

const _clientEnv = {
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL,
    FETCH_CITY_AUTOCOMPLETE_AMOUNT: parseInt(process.env.FETCH_CITY_AUTOCOMPLETE_AMOUNT ?? '', 10),
    FETCH_CITY_AUTOCOMPLETE_SORT: process.env.FETCH_CITY_AUTOCOMPLETE_SORT,
    FETCH_CITY_AUTOCOMPLETE_OFFSET: parseInt(process.env.FETCH_CITY_AUTOCOMPLETE_OFFSET ?? '', 10),
    MAX_WEATHER_CITIES_AMOUNT: parseInt(process.env.MAX_WEATHER_CITIES_AMOUNT ?? '', 10),
    MAX_FORECAST_DAYS: parseInt(process.env.MAX_FORECAST_DAYS ?? '', 10),
    WEATHER_FORECAST_CACHE_TIME: parseInt(process.env.WEATHER_FORECAST_CACHE_TIME ?? '', 10),
    PASSWORD_MIN_LENGTH: parseInt(process.env.PASSWORD_MIN_LENGTH ?? '', 10),
};

const { error, value } = client.validate(_clientEnv);

if (error) {
    console.error(
        "❌ Invalid environment variables:",
        error.message,

        `\n❌ Missing variables in .env file, Make sure all required variables are defined in the .env file.`,
        `\n💡 Tip: If you recently updated the .env file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
    );
    throw new Error(
        "Invalid environment variables, Check terminal for more details "
    );
}

const Env = value;
const ClientEnv = client.validate(_clientEnv).value;

module.exports = {
    Env,
    ClientEnv,
};