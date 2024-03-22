import { useApolloClient } from '@apollo/client';

import { useSubscriptionError, useWeatherPaginationInfo } from '@/context';
import { Direction } from '@/shared'
import { WeatherForecastEdge } from '@/graphql/typePolicies/userCitiesWeather';
import { usePagination } from '@/hooks';
import { useWeatherData } from '../useWeatherData';
import {
  UserCitiesWeatherDocument,
  UserCitiesWeatherQuery,
  UserCitiesWeatherQueryVariables,
} from '../useWeatherData/queries';

interface HookReturn {
  onClickPrev: () => Promise<void>;
  onClickNext: () => Promise<void>;
  onGoToPage: (page: number) => Promise<void>;
  isPageContentCached: (variables: Partial<UserCitiesWeatherQueryVariables>, direction: Direction) => boolean;
  onPrefetch: (variables: Partial<UserCitiesWeatherQueryVariables>) => Promise<void>
}

export const useWeatherPagination = (): HookReturn => {
  const client = useApolloClient();
  const { data, fetchMore } = useWeatherData();
  const { handleError } = useSubscriptionError();
  const { totalPages, currentPage, setCurrentPage, paginationOptions, updatePaginationOptions } =
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
    onCurrentPageChange: setCurrentPage,
    totalPages,
  });

  const onPrefetch = async (variables: Partial<UserCitiesWeatherQueryVariables>): Promise<void> => {
    await fetchMore({ variables });
  }

  return { onClickPrev, onClickNext, onGoToPage, isPageContentCached, onPrefetch };
};
