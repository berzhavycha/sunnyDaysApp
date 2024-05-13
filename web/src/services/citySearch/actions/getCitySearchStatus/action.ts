'use server';

import { getClient } from '@/graphql/utils/getClient';

import { CitySearchStatusDocument } from './queries';

export const getCitySearchStatus = async (): Promise<boolean> => {
  try {
    const { data } = await getClient().query({
      query: CitySearchStatusDocument,
    });

    return data.citySearchStatus;
  } catch (error) {
    return false;
  }
};
