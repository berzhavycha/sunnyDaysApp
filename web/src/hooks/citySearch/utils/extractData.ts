import { CitiesQuery, City } from '../useCityInputComplete';

export const extractData = (data: CitiesQuery): City[] => {
  if (!data || !data.citiesByPrefix) {
    return [];
  }

  return data.citiesByPrefix;
};
