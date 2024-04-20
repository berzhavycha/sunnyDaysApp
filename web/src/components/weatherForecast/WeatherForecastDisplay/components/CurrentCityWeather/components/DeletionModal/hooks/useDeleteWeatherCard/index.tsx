import { useSubscriptionError, useWeatherCardsList, useCurrentCityWeatherInfo, useWeatherPaginationInfo } from "@/context";
import { useWeatherPagination, usePaginationPrefetch } from "@/hooks";
import { deleteWeatherSubscription } from "@/services";
import { START_PAGE_NUMBER, IS_CLIENT, MD_BREAKPOINT } from "@/shared";
import { ApolloError } from "@apollo/client";
import { env } from "@/core/env";

type HookReturn = {
    isDeletionInProgress: boolean
    onDelete: () => Promise<void>;
    onMouseOverDeleteBtn: () => Promise<void>;
}

type HookInput = {
    city: string;
    onClose: () => void
}

export const useDeleteWeatherCard = ({ city, onClose }: HookInput): HookReturn => {
    const { errorHandler, setError } = useSubscriptionError();
    const { weatherData } = useWeatherCardsList();
    const { setIsVisibleBelowMedium, isDeletionInProgress, setIsDeletionInProgress } =
        useCurrentCityWeatherInfo();

    const { onPrefetch } = useWeatherPagination();
    const { paginationOptions, currentPage, totalPages, totalCount } = useWeatherPaginationInfo();
    const { onPrevPrefetch } = usePaginationPrefetch({
        paginationOptions,
        startPageNumber: START_PAGE_NUMBER,
        currentPage,
        totalPages,
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
            if (error instanceof ApolloError) {
                errorHandler(error);
            }
        } finally {
            setIsDeletionInProgress(false);
            onClose();
        }
    };

    const onMouseOverDeleteBtn = async (): Promise<void> => {
        if (
            (totalCount - 1) % env.NEXT_PUBLIC_WEATHER_CITIES_LIMIT === 0 &&
            weatherData?.userCitiesWeather.edges?.length === 1
        ) {
            await onPrevPrefetch();
        }
    };

    return {
        isDeletionInProgress,
        onDelete,
        onMouseOverDeleteBtn
    }
}