import { ApolloError } from '@apollo/client';

import {
  useCurrentCityWeatherInfo,
  useSubscriptionError,
} from '@/context';
import { env } from '@/core/env';
import { usePaginationPrefetch, useWeatherPagination } from '@/hooks';
import { UserCitiesWeatherQuery, deleteWeatherSubscription } from '@/services';
import { IS_CLIENT, MD_BREAKPOINT, START_PAGE_NUMBER, countTotalPages, extractPaginationParams } from '@/shared';
import { useSearchParams } from 'next/navigation';

type HookReturn = {
  onDelete: () => Promise<void>;
  onMouseOverDeleteBtn: () => Promise<void>;
};

type HookInput = {
  city: string;
  onClose: () => void;
  weatherData?: UserCitiesWeatherQuery;
  setIsDeletionInProgress: (state: boolean) => void
};

export const useDeleteWeatherCard = ({ city, onClose, weatherData, setIsDeletionInProgress }: HookInput): HookReturn => {
  const { errorHandler, setError } = useSubscriptionError();
  const { setIsVisibleBelowMedium } =
    useCurrentCityWeatherInfo();

  const searchParams = useSearchParams()
  const { page, ...paginationOptions } = extractPaginationParams(searchParams)

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
      setError({ message: '' });
    } catch (error) {
      if (error instanceof ApolloError || error instanceof Error) {
        errorHandler(error);
      }
    } finally {
      setIsDeletionInProgress(false);
      onClose();
    }
  };

  const onMouseOverDeleteBtn = async (): Promise<void> => {
    if (
      weatherData &&
      (weatherData.userCitiesWeather.paginationInfo.totalCount - 1) % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0 &&
      weatherData.userCitiesWeather.edges?.length === 1
    ) {
      await onPrevPrefetch();
    }
  };

  return {
    onDelete,
    onMouseOverDeleteBtn,
  };
};
