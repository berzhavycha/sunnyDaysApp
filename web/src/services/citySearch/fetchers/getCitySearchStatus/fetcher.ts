import { ApolloError } from '@apollo/client';

import { env } from '@/core/env';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { getClient } from '@/graphql/utils/getClient';
import { FetchResponse } from '@/shared';

import { CitySearchStatusDocument, CitySearchStatusQuery } from './queries';

export const getCitySearchStatus = async (): Promise<FetchResponse<CitySearchStatusQuery>> => {
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
      responseData: data,
      error: null,
    };
  } catch (error) {
    return {
      responseData: null,
      error: new ApolloError({ errorMessage: UNEXPECTED_ERROR_MESSAGE }),
    };
  }
};
