import { ApolloQueryResult } from '@apollo/client';

import { env } from '@/core/env';
import { getClient } from '@/graphql/utils/getClient';
import { getPaginationParams } from '@/shared';

import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';

export const getWeatherForecasts = async (): Promise<ApolloQueryResult<UserCitiesWeatherQuery>> => {
  const { paginationOptions } = getPaginationParams();

  const data = await getClient().query({
    query: UserCitiesWeatherDocument,
    variables: {
      ...paginationOptions,
      forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
    },
    context: {
      fetchOptions: {
        next: {
          tags: ['forecasts'],
        },
      },
    },
  });

  return data;
};
