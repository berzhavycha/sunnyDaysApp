import { useSubscriptionError, useWeatherPaginationQueryOptions } from '@/context';
import { WeatherForecastEdge } from '@/graphql/typePolicies/userCitiesWeather';
import { usePagination } from '@/hooks';
import { useWeatherData } from '../useWeatherData';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables } from '../useWeatherData/queries';

interface HookReturn {
    onClickPrev: () => Promise<void>;
    onClickNext: () => Promise<void>;
    onGoToPage: (page: number) => Promise<void>;
    isPageContentCached: (variables: Partial<UserCitiesWeatherQueryVariables>) => boolean;
}

export const useWeatherPagination = (): HookReturn => {
    const { data, fetchMore } = useWeatherData();
    const { handleError } = useSubscriptionError();
    const {
        totalPages,
        currentPage,
        setCurrentPage,
        paginationOptions,
        updatePaginationOptions,
    } = useWeatherPaginationQueryOptions();

    const { onGoToPage, onClickNext, onClickPrev, isPageContentCached } = usePagination<WeatherForecastEdge, UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables>({
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

    return { onClickPrev, onClickNext, onGoToPage, isPageContentCached };
};
