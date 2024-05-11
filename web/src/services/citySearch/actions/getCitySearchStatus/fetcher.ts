'use server'

import { env } from '@/core/env';

import { CitySearchStatusDocument } from './queries';
import { getClient } from '@/graphql/utils/getClient';

export const getCitySearchStatus = async (): Promise<boolean> => {
  try {
    const { data } = await getClient().query({
      query: CitySearchStatusDocument,
      context: {
        fetchOptions: {
          next: {
            revalidate: env.NEXT_PUBLIC_FEATURE_CACHE_SECONDS_TIME,
          },
        },
      },
    });

    return data.citySearchStatus
  } catch (error) {
    return false
  }
};
