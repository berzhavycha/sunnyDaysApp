import { Env } from '@/env';

import { CitiesQueryVariables } from '../useCityInputComplete';

export const getCitiesQueryVariables = (city: string): CitiesQueryVariables => ({
  prefix: city,
  sort: Env.CITIES_SEARCH_SORT,
  offset: Env.CITIES_SEARCH_OFFSET,
  limit: Env.CITIES_SEARCH_LIMIT,
  minPopulation: Env.CITIES_SEARCH_MIN_POPULATION,
});
