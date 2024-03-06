// API
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// CITY SEARCH
export const CITIES_SEARCH_LIMIT = parseInt(process.env.NEXT_PUBLIC_CITIES_SEARCH_LIMIT as string);
export const CITIES_SEARCH_SORT = process.env.NEXT_PUBLIC_CITIES_SEARCH_SORT as string;
export const CITIES_SEARCH_OFFSET = parseInt(
  process.env.NEXT_PUBLIC_CITIES_SEARCH_OFFSET as string,
);
export const CITIES_SEARCH_MIN_POPULATION = parseInt(
  process.env.NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION as string,
);

// WEATHER FORECAST
export const MAX_WEATHER_CITIES_AMOUNT = parseInt(
  process.env.NEXT_PUBLIC_MAX_WEATHER_CITIES_AMOUNT as string,
);
export const MAX_FORECAST_DAYS = parseInt(process.env.NEXT_PUBLIC_MAX_FORECAST_DAYS as string);
export const WEATHER_FORECAST_CACHE_MINUTES_TIME = parseInt(
  process.env.NEXT_PUBLIC_WEATHER_FORECAST_CACHE_TIME_MINUTES as string,
);
export const WEATHER_CITIES_LIMIT = parseInt(process.env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT as string)
export const WEATHER_CITIES_ORDER = parseInt(process.env.NEXT_PUBLIC_WEATHER_CITIES_ORDER as string)


// GENERAL
export const PASSWORD_MIN_LENGTH = parseInt(process.env.NEXT_PUBLIC_PASSWORD_MIN_LENGTH as string);

export const FEATURE_CACHE_MINUTES_TIME = parseInt(
  process.env.NEXT_PUBLIC_FEATURE_CACHE_MINUTES_TIME as string,
);
