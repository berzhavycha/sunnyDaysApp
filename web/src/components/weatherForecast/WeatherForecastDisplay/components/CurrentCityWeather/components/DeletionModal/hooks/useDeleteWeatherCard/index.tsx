import { ApolloError } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useCurrentCityWeatherInfo } from '@/context';
import { env } from '@/core/env';
import { usePaginationPrefetch, useWeatherPagination } from '@/hooks';
import { deleteWeatherSubscription, UserCitiesWeatherQuery } from '@/services';
import {
  countTotalPages,
  extractPaginationParams,
  getApolloErrorMessage,
  IS_CLIENT,
  MD_BREAKPOINT,
  START_PAGE_NUMBER,
} from '@/shared';

type HookReturn = {
  error: string;
  onDelete: () => Promise<void>;
  onMouseOverDeleteBtn: () => Promise<void>;
};

type HookInput = {
  city: string;
  onClose: () => void;
  weatherData?: UserCitiesWeatherQuery;
  setIsDeletionInProgress: (state: boolean) => void;
};

export const useDeleteWeatherCard = ({
  city,
  onClose,
  weatherData,
  setIsDeletionInProgress,
}: HookInput): HookReturn => {
  const [error, setError] = useState<string>('');
  const { setIsVisibleBelowMedium } = useCurrentCityWeatherInfo();

  const searchParams = useSearchParams();
  const { page, ...paginationOptions } = extractPaginationParams(searchParams);

  const { onPrefetch } = useWeatherPagination();
  const { onPrevPrefetch } = usePaginationPrefetch({
    paginationOptions,
    startPageNumber: START_PAGE_NUMBER,
    currentPage: page,
    totalPages: countTotalPages(weatherData?.userCitiesWeather, paginationOptions),
    onPrefetch,
  });

  const onDelete = async (): Promise<void> => {
    try {
      setIsDeletionInProgress(true);
      await deleteWeatherSubscription(weatherData, city);
      if (IS_CLIENT && window.innerWidth < MD_BREAKPOINT) {
        setIsVisibleBelowMedium(false);
      }
      setError('');
      onClose();
    } catch (error) {
      if (error instanceof ApolloError || error instanceof Error) {
        setError(getApolloErrorMessage(error));
      }
    } finally {
      setIsDeletionInProgress(false);
    }
  };

  const onMouseOverDeleteBtn = async (): Promise<void> => {
    if (
      weatherData &&
      (weatherData.userCitiesWeather.paginationInfo.totalCount - 1) %
        env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT ===
        0 &&
      weatherData.userCitiesWeather.edges?.length === 1
    ) {
      await onPrevPrefetch();
    }
  };

  return {
    error,
    onDelete,
    onMouseOverDeleteBtn,
  };
};
