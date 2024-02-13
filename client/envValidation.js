const Joi = require("joi");
const path = require("path");
// eslint-disable-next-line no-undef
const envPath = path.resolve(__dirname, `.env`);

require("dotenv").config({
    path: envPath,
});

const client = Joi.object({
    REACT_APP_GRAPHQL_BASE_URL: Joi.string().required(),
    REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT: Joi.number().default(5),
    REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT: Joi.string().default("population"),
    REACT_APP_FETCH_CITY_AUTOCOMPLETE_OFFSET: Joi.number().default(0),
    REACT_APP_MAX_WEATHER_CITIES_AMOUNT: Joi.number().default(10),
    REACT_APP_MAX_FORECAST_DAYS: Joi.number().default(10),
    REACT_APP_WEATHER_FORECAST_CACHE_TIME: Joi.number().default(1800),
    REACT_APP_PASSWORD_MIN_LENGTH: Joi.number().default(8),
})

const _clientEnv = {
    REACT_APP_GRAPHQL_BASE_URL: process.env.REACT_APP_GRAPHQL_BASE_URL,
    REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT: parseInt(process.env.REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT ?? '', 10),
    REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT: process.env.REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
    REACT_APP_FETCH_CITY_AUTOCOMPLETE_OFFSET: parseInt(process.env.REACT_APP_FETCH_CITY_AUTOCOMPLETE_OFFSET ?? '', 10),
    REACT_APP_MAX_WEATHER_CITIES_AMOUNT: parseInt(process.env.REACT_APP_MAX_WEATHER_CITIES_AMOUNT ?? '', 10),
    REACT_APP_MAX_FORECAST_DAYS: parseInt(process.env.REACT_APP_MAX_FORECAST_DAYS ?? '', 10),
    REACT_APP_WEATHER_FORECAST_CACHE_TIME: parseInt(process.env.REACT_APP_WEATHER_FORECAST_CACHE_TIME ?? '', 10),
    REACT_APP_PASSWORD_MIN_LENGTH: parseInt(process.env.REACT_APP_PASSWORD_MIN_LENGTH ?? '', 10),
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