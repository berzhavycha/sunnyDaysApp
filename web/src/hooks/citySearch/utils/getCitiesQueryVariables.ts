import { CITIES_SEARCH_OFFSET, CITIES_SEARCH_LIMIT, CITIES_SEARCH_MIN_POPULATION, CITIES_SEARCH_SORT } from '@/global';
import { CitiesQueryVariables } from '../useCityInputComplete/queries';

export const getCitiesQueryVariables = (city: string): CitiesQueryVariables => ({
  prefix: city,
  sort: CITIES_SEARCH_SORT,
  offset: CITIES_SEARCH_OFFSET,
  limit: CITIES_SEARCH_LIMIT,
  minPopulation: CITIES_SEARCH_MIN_POPULATION,
});
