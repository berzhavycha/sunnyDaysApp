'use server';

import { ApolloError } from '@apollo/client';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { env } from '@/core/env';
import { getClient } from '@/graphql/utils/getClient';
import { getPaginationParams } from '@/shared';

import { UserCitiesWeatherQuery } from '../../fetchers';

import { DeleteWeatherSubscriptionDocument } from './mutations';

export const deleteWeatherSubscription = async (
  weatherData: UserCitiesWeatherQuery | undefined,
  cityName: string,
): Promise<void> => {
  const { page, paginationOptions } = getPaginationParams();

  const { errors } = await getClient().mutate({
    mutation: DeleteWeatherSubscriptionDocument,
    variables: {
      city: {
        name: cityName,
      },
    },
  });

  if (errors?.length) {
    throw new ApolloError({ graphQLErrors: errors });
  }

  const totalCount = weatherData?.userCitiesWeather.paginationInfo.totalCount ?? 0;

  if (
    (totalCount - 1) % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0 &&
    weatherData?.userCitiesWeather.edges.length === 1 &&
    totalCount - 1 > 0
  ) {
    const path = `/weather-forecast?page=${page - 1}&perPage=${paginationOptions.limit}&order=${paginationOptions.order}`;
    redirect(path);
  } else {
    revalidateTag('forecasts');
  }
};
