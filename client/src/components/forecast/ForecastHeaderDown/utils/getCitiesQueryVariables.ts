import { REACT_APP_FETCH_CITY_AMOUNT, REACT_APP_FETCH_CITY_SORT } from '@env';
import { QueryVariables } from '..';

export const getCitiesQueryVariables = (city: string): QueryVariables => ({
  namePrefix: city,
  sort: REACT_APP_FETCH_CITY_SORT,
  first: REACT_APP_FETCH_CITY_AMOUNT,
});
