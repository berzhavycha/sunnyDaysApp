import { Env } from '@/env';
import { CitiesQueryVariables } from '../hooks/useCityInputComplete/queries';

export const getCitiesQueryVariables = (city: string): CitiesQueryVariables => ({
  prefix: city,
  sort: Env.FETCH_CITY_AUTOCOMPLETE_SORT,
  offset: Env.FETCH_CITY_AUTOCOMPLETE_OFFSET,
  limit: Env.FETCH_CITY_AUTOCOMPLETE_AMOUNT,
});
