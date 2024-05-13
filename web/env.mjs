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
    NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE: process.env.NEXT_PUBLIC_FORECAST_DAYS_PER_SLIDE,
    NEXT_PUBLIC_STATIC_CACHE_SECONDS_TIME: process.env.NEXT_PUBLIC_STATIC_CACHE_SECONDS_TIME,
    NEXT_PUBLIC_DYNAMIC_CACHE_SECONDS_TIME: process.env.NEXT_PUBLIC_DYNAMIC_CACHE_SECONDS_TIME,
    NEXT_PUBLIC_PASSWORD_MIN_LENGTH: process.env.NEXT_PUBLIC_PASSWORD_MIN_LENGTH,
    NEXT_PUBLIC_TEMP_UNIT_COOKIE_EXPIRATION_DAYS_TIME: process.env.NEXT_PUBLIC_TEMP_UNIT_COOKIE_EXPIRATION_DAYS_TIME
};

export const serverEnv = {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_COOKIE_EXPIRATION_DAYS_TIME: process.env.AUTH_COOKIE_EXPIRATION_DAYS_TIME
};