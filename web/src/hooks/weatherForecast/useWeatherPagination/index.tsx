import { useApolloClient } from '@apollo/client';

import { useSubscriptionError, useWeatherPaginationInfo } from '@/context';
import { env } from '@/core/env';
import { WeatherForecastEdge } from '@/graphql/typePolicies/userCitiesWeather';
import { usePagination } from '@/hooks';
import { Direction, PaginationQueryOptionsState } from '@/shared';

import {
  useWeatherData,
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
} from '../useWeatherData';

export type OnPrefetch = (
  variables: Partial<PaginationQueryOptionsState>,
  direction: Direction,
) => Promise<void>;

type HookReturn = {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  isPageContentCached: (
    variables: Partial<UserCitiesWeatherQueryVariables>,
    direction: Direction,
  ) => boolean;
  onPrefetch: OnPrefetch;
};

export const useWeatherPagination = (): HookReturn => {
  const client = useApolloClient();
  const { data, fetchMore } = useWeatherData();
  const { errorHandler } = useSubscriptionError();
  const { totalPages, currentPage, paginationOptions, updatePaginationOptions } =
    useWeatherPaginationInfo();

  const { onGoToPage, onClickNext, onClickPrev, isPageContentCached, onPrefetch } = usePagination<
    WeatherForecastEdge,
    UserCitiesWeatherQuery,
    UserCitiesWeatherQueryVariables
  >({
    client,
    query: UserCitiesWeatherDocument,
    data,
    queryDataField: 'userCitiesWeather',
    fetchMore,
    onError: errorHandler,
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    totalPages,
  });

  const onWeatherPagePrefetch = async (
    variables: Partial<PaginationQueryOptionsState>,
    direction: Direction,
  ): Promise<void> => {
    await onPrefetch(
      {
        ...paginationOptions,
        ...variables,
        forecastDaysAmount: env.NEXT_PUBLIC_MAX_FORECAST_DAYS,
      },
      direction,
    );
  };

  return {
    onClickPrev,
    onClickNext,
    onGoToPage,
    isPageContentCached,
    onPrefetch: onWeatherPagePrefetch,
  };
};
