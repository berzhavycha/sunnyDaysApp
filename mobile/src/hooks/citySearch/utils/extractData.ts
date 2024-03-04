import { CitiesQuery } from '../useCityInputComplete/queries';
import { City } from '..';

export const extractData = (data: CitiesQuery): City[] => {
  if (!data || !data.citiesByPrefix) {
    return [];
  }

  return data.citiesByPrefix;
};
