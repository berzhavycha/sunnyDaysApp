const { envSchema } = require('./envValidation')
const path = require("path");
// eslint-disable-next-line no-undef
const envPath = path.resolve(__dirname, `.env`);

require("dotenv").config({
    path: envPath,
});

const _clientEnv = {
    BASE_URL: process.env.BASE_URL,
    CITIES_SEARCH_LIMIT: parseInt(process.env.CITIES_SEARCH_LIMIT ?? '', 10),
    CITIES_SEARCH_SORT: process.env.CITIES_SEARCH_SORT,
    CITIES_SEARCH_OFFSET: parseInt(process.env.CITIES_SEARCH_OFFSET ?? '', 10),
    CITIES_SEARCH_MIN_POPULATION: parseInt(process.env.CITIES_SEARCH_MIN_POPULATION ?? '', 10),
    WEATHER_CITIES_LIMIT: parseInt(process.env.WEATHER_CITIES_LIMIT ?? '', 10),
    MAX_WEATHER_CITIES_AMOUNT: parseInt(process.env.MAX_WEATHER_CITIES_AMOUNT ?? '', 10),
    WEATHER_CITIES_ORDER: process.env.WEATHER_CITIES_ORDER,
    MAX_FORECAST_DAYS: parseInt(process.env.MAX_FORECAST_DAYS ?? '', 10),
    WEATHER_FORECAST_CACHE_MINUTES_TIME: parseInt(process.env.WEATHER_FORECAST_CACHE_MINUTES_TIME ?? '', 10),
    PASSWORD_MIN_LENGTH: parseInt(process.env.PASSWORD_MIN_LENGTH ?? '', 10),
    FEATURE_CACHE_MINUTES_TIME: parseInt(process.env.FEATURE_CACHE_MINUTES_TIME ?? '', 10)
};

const { error, value } = envSchema.validate(_clientEnv);

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
const ClientEnv = envSchema.validate(_clientEnv).value;

module.exports = {
    Env,
    ClientEnv,
};