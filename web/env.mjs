// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { clientSchema, serverSchema } from "./envValidation.mjs";

/**
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CITIES_SEARCH_LIMIT: process.env.NEXT_PUBLIC_CITIES_SEARCH_LIMIT,
    NEXT_PUBLIC_CITIES_SEARCH_SORT: process.env.NEXT_PUBLIC_CITIES_SEARCH_SORT,
    NEXT_PUBLIC_CITIES_SEARCH_OFFSET: process.env.NEXT_PUBLIC_CITIES_SEARCH_OFFSET,
    NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION: process.env.NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION,
    NEXT_PUBLIC_WEATHER_CITIES_LIMIT: process.env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT,
    NEXT_PUBLIC_WEATHER_CITIES_ORDER: process.env.NEXT_PUBLIC_WEATHER_CITIES_ORDER,
    NEXT_PUBLIC_MAX_WEATHER_CITIES_AMOUNT: process.env.NEXT_PUBLIC_MAX_WEATHER_CITIES_AMOUNT,
    NEXT_PUBLIC_MAX_FORECAST_DAYS: process.env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
    NEXT_PUBLIC_WEATHER_FORECAST_CACHE_MINUTES_TIME: process.env.NEXT_PUBLIC_WEATHER_FORECAST_CACHE_MINUTES_TIME,
    NEXT_PUBLIC_PASSWORD_MIN_LENGTH: process.env.NEXT_PUBLIC_PASSWORD_MIN_LENGTH,
    NEXT_PUBLIC_FEATURE_CACHE_MINUTES_TIME: process.env.NEXT_PUBLIC_FEATURE_CACHE_MINUTES_TIME
};

/**
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
    SECRET_COOKIE_KEY: process.env.SECRET_COOKIE_KEY
};