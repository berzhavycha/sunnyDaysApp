import { ApolloClient } from '@apollo/client';

import { PaginationQueryOptionsState } from '@/shared';
import { Env } from '@/env';

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
            forecastDaysAmount: Env.MAX_FORECAST_DAYS,
          },
        });

        return existingPageData;
      },
    },
  });
};
