import { FC, createContext, PropsWithChildren, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { Env } from '@/env';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery, UserCitiesWeatherQueryVariables } from '@/hooks/weatherForecast/useWeatherData/queries';
import { useCurrentUser } from '../CurrentUser';
import { START_PAGE_NUMBER } from './constants';
import { useApolloClient } from '@apollo/client';

type WeatherPaginationQueryOptionsState = {
    offset: number;
    limit: number;
    order: string;
};

type ContextType = {
    paginationOptions: WeatherPaginationQueryOptionsState;
    updatePaginationOptions: (newOptions: Partial<UserCitiesWeatherQueryVariables>) => void;
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
    isFetching: boolean;
    setIsFetching: Dispatch<SetStateAction<boolean>>;
    isPageCached: (variables: Partial<UserCitiesWeatherQueryVariables>) => boolean
};

const CurrentPaginationQueryOptionsContext = createContext<ContextType | null>(null);

export const useWeatherPaginationQueryOptions = (): ContextType => {
    const paginationOptionsContext = useContext(CurrentPaginationQueryOptionsContext);

    if (!paginationOptionsContext) {
        throw new Error('useWeatherPaginationOptions must be used within an WeatherPaginationOptionsProvider');
    }

    return paginationOptionsContext;
};

export const WeatherPaginationQueryOptionsProvider: FC<PropsWithChildren> = ({ children }) => {
    const { currentUser } = useCurrentUser()
    const client = useApolloClient();
    const [currentPage, setCurrentPage] = useState<number>(START_PAGE_NUMBER)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [paginationOptions, setPaginationOptions] = useState<WeatherPaginationQueryOptionsState>({
        offset: 0,
        limit: Env.WEATHER_CITIES_LIMIT,
        order: Env.WEATHER_CITIES_ORDER,
    })

    useEffect(() => {
        setPaginationOptions(prevState => ({
            ...prevState,
            offset: 0,
        }));
    }, [currentUser])

    const updatePaginationOptions = (newOptions: Partial<UserCitiesWeatherQueryVariables>): void => {
        setPaginationOptions(prevState => ({
            ...prevState,
            ...newOptions,
        }));
    };

    const isPageCached = (variables: Partial<UserCitiesWeatherQueryVariables>): boolean => {
        const cachedData = client.readQuery<UserCitiesWeatherQuery>({
            query: UserCitiesWeatherDocument,
            variables: {
                ...paginationOptions,
                ...variables
            }
        });

        if (cachedData?.userCitiesWeather.edges?.length) {
            const isValueCorrect = cachedData.userCitiesWeather.edges?.some(edge => !!edge);
            return isValueCorrect;
        }

        return false;
    };

    const contextValue: ContextType = {
        paginationOptions,
        updatePaginationOptions,
        currentPage,
        setCurrentPage,
        isFetching,
        setIsFetching,
        isPageCached
    };

    return (
        <CurrentPaginationQueryOptionsContext.Provider value={contextValue}>
            {children}
        </CurrentPaginationQueryOptionsContext.Provider>
    );
};