import { CitiesQuery } from '../useCityInputComplete';

import { City } from '..';

export const extractData = (data: CitiesQuery): City[] => {
  if (!data || !data.citiesByPrefix) {
    return [];
  }

  return data.citiesByPrefix;
};
