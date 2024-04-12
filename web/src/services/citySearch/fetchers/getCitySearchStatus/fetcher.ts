import { ApolloQueryResult } from '@apollo/client';

import { env } from '@/core/env';
import { getClient } from '@/graphql/utils/getClient';

import { CitySearchStatusDocument, CitySearchStatusQuery } from './queries';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';

type CitySearchStatusData = {
  citySearchStatusResponse: ApolloQueryResult<CitySearchStatusQuery> | null,
  error: string
}

export const getCitySearchStatus = async (): Promise<CitySearchStatusData> => {
  try {
    const data = await getClient().query({
      query: CitySearchStatusDocument,
      context: {
        fetchOptions: {
          next: {
            revalidate: env.NEXT_PUBLIC_FEATURE_CACHE_SECONDS_TIME,
          },
        },
      },
    });

    return {
      citySearchStatusResponse: data,
      error: ''
    };
  } catch (error) {
    return {
      citySearchStatusResponse: null,
      error: UNEXPECTED_ERROR_MESSAGE
    };
  }
};
