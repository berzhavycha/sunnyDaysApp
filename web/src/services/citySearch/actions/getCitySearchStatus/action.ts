'use server'

import { CitySearchStatusDocument } from './queries';
import { getClient } from '@/graphql/utils/getClient';

export const getCitySearchStatus = async (): Promise<boolean> => {
  try {
    const { data } = await getClient().query({
      query: CitySearchStatusDocument,
    });

    return data.citySearchStatus
  } catch (error) {
    return false
  }
};
