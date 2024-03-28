import { useApolloClient } from '@apollo/client';

import { useSubscriptionError, useWeatherPaginationInfo } from '@/context';
import { Direction } from '@/shared';
import { usePagination } from '@/hooks/common';
import { WeatherForecastEdge } from '@/graphql/typePolicies/userCitiesWeather';
import { useWeatherData } from '../useWeatherData';
import {
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
} from '../useWeatherData/queries';

type HookReturn = {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  isPageContentCached: (
    variables: Partial<UserCitiesWeatherQueryVariables>,
    direction: Direction,
  ) => boolean;
};

export const useWeatherPagination = (): HookReturn => {
  const client = useApolloClient();
  const { data, fetchMore } = useWeatherData();
  const { handleError } = useSubscriptionError();
  const { totalPages, currentPage, paginationOptions, updatePaginationOptions, setIsFetching } =
    useWeatherPaginationInfo();

  const { onGoToPage, onClickNext, onClickPrev, isPageContentCached } = usePagination<
    WeatherForecastEdge,
    UserCitiesWeatherQuery,
    UserCitiesWeatherQueryVariables
  >({
    client,
    query: UserCitiesWeatherDocument,
    data,
    queryDataField: 'userCitiesWeather',
    fetchMore,
    onError: handleError,
    paginationOptions,
    updatePaginationOptions,
    currentPage,
    totalPages,
    setIsFetching
  });

  return {
    onClickPrev,
    onClickNext,
    onGoToPage,
    isPageContentCached,
  };
};
