import { ApolloClient } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { env } from '@/core/env';

export const clearPageCache = (
  client: ApolloClient<object>,
  paginationOptions: PaginationQueryOptionsState,
): void => {
  client.cache.modify({
    fields: {
      userCitiesWeather(existingPageData) {
        client.cache.evict({
          fieldName: 'userCitiesWeather',
          args: {
            ...paginationOptions,
            forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
          },
        });

        return existingPageData;
      },
    },
  });
};
