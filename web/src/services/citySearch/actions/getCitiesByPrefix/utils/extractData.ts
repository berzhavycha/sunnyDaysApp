import { City } from '@/shared';
import { CitiesQuery } from '../queries';

export const extractData = (data: CitiesQuery): City[] => {
  if (!data || !data.citiesByPrefix) {
    return [];
  }

  return data.citiesByPrefix;
};
