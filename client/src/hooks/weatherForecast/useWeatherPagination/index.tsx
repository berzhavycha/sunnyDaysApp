import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import { useWeatherPaginationQueryOptions } from '@/context';
import { START_PAGE_NUMBER } from '@/context/WeatherPaginationOptions/constants';
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
  totalPages: number;
  paginationPageNumbers: number[];
};

export const useWeatherPagination = (): HookReturn => {
  const client = useApolloClient();
  const { data, fetchMore } = useWeatherData();
  const { paginationOptions, currentPage, setCurrentPage, setIsFetching, updatePaginationOptions } =
    useWeatherPaginationQueryOptions();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [paginationPageNumbers, setPaginationPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    const totalCount = data?.userCitiesWeather.paginationInfo?.totalCount ?? 0;
    setTotalPages(Math.ceil(totalCount / paginationOptions.limit));
    setPaginationPageNumbers(Array.from({ length: totalPages }, (_, index) => index + 1));
  }, [data, paginationOptions.limit, totalPages]);

  const isPageCached = (variables: Partial<UserCitiesWeatherQueryVariables>): boolean => {
    const cachedData = client.readQuery<UserCitiesWeatherQuery>({
      query: UserCitiesWeatherDocument,
      variables: {
        ...paginationOptions,
        ...variables,
      },
    });

    if (cachedData?.userCitiesWeather.edges?.length) {
      const isValueCorrect = cachedData.userCitiesWeather.edges?.some((edge) => !!edge);
      return isValueCorrect;
    }

    return false;
  };

  const onFetchMore = async (
    variables: Partial<UserCitiesWeatherQueryVariables>,
  ): Promise<void> => {
    if (!isPageCached(variables)) {
      setIsFetching(true);
      await fetchMore({ variables });
      setIsFetching(false);
    }

    updatePaginationOptions(variables);
  };

  const onClickPrev = async (): Promise<void> => {
    if (currentPage !== START_PAGE_NUMBER) {
      await onFetchMore({ offset: paginationOptions.offset - paginationOptions.limit });
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onClickNext = async (): Promise<void> => {
    if (currentPage !== totalPages) {
      await onFetchMore({ offset: (data?.userCitiesWeather.edges?.length ?? 1) * currentPage });
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const onGoToPage = async (page: number): Promise<void> => {
    const offset = (page - 1) * paginationOptions.limit;
    await onFetchMore({ offset });
    setCurrentPage(page);
  };

  return { onClickPrev, onClickNext, onGoToPage, totalPages, paginationPageNumbers };
};
