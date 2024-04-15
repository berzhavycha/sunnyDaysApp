import { ApolloError, ApolloQueryResult } from '@apollo/client';

import { env } from '@/core/env';
import { UNEXPECTED_ERROR_MESSAGE } from '@/graphql';
import { getClient } from '@/graphql/utils/getClient';
import { getPaginationParams } from '@/shared';

import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';

export type FetchWeatherForecast = {
  responseData: ApolloQueryResult<UserCitiesWeatherQuery> | null;
  error: ApolloError | null;
};

export const getWeatherForecasts = async (): Promise<FetchWeatherForecast> => {
  try {
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
