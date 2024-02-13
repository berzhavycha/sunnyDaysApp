import { CitiesQuery } from '../hooks/useCityInputComplete/queries';
import { City } from '../types';

export const extractData = (data: CitiesQuery): City[] => {
  if (!data || !data.citiesByPrefix) {
    return [];
  }

  return data.citiesByPrefix;
};
