import {
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT,
  REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
} from '@env';
import { CitiesQueryVariables } from '../hooks/useCityInputComplete/queries';

export const getCitiesQueryVariables = (city: string): CitiesQueryVariables => ({
  namePrefix: city,
  sort: REACT_APP_FETCH_CITY_AUTOCOMPLETE_SORT,
  first: REACT_APP_FETCH_CITY_AUTOCOMPLETE_AMOUNT,
});
