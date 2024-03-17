import { env } from '@/core/env';
import { CitiesQueryVariables } from '../useCityInputComplete/queries';

export const getCitiesQueryVariables = (city: string): CitiesQueryVariables => ({
  prefix: city,
  sort: env.NEXT_PUBLIC_CITIES_SEARCH_SORT,
  offset: env.NEXT_PUBLIC_CITIES_SEARCH_OFFSET,
  limit: env.NEXT_PUBLIC_CITIES_SEARCH_LIMIT,
  minPopulation: env.NEXT_PUBLIC_CITIES_SEARCH_MIN_POPULATION,
});
