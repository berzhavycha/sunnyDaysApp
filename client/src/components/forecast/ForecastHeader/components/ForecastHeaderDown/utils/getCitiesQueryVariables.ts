import {
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT,
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
} from '@env';
import { QueryVariables } from '../interfaces';

export const getCitiesQueryVariables = (city: string): QueryVariables => ({
  namePrefix: city,
  sort: REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
  first: REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT,
});
