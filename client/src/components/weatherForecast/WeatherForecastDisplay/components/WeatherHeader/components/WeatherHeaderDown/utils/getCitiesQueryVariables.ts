import {
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT,
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_OFFSET,
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
} from '@env';
import { CitiesQueryVariables } from '../hooks/useCityInputComplete/queries';

export const getCitiesQueryVariables = (city: string): CitiesQueryVariables => ({
  prefix: city,
  sort: REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
  offset: +REACT_APP_FETCH_CITY_AUTOCOMPLETE_OFFSET,
  limit: +REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT,
});
