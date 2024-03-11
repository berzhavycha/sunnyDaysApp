'use client';

import {
    FC,
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
} from 'react';


import {
    ApolloError,
    ApolloQueryResult,
    FetchMoreQueryOptions,
    OperationVariables,
    useSuspenseQuery,
} from '@apollo/client';
import { MAX_FORECAST_DAYS } from '@/global';
import { UserCitiesWeatherQuery, UserCitiesWeatherDocument } from '@/hooks/weatherForecast/useWeatherData/queries';
import { useSubscriptionError, useWeatherPaginationQueryOptions, useCurrentCityWeatherInfo } from '..';



type ContextType = {
    data?: UserCitiesWeatherQuery;
    loading: boolean;
    error?: ApolloError;
    fetchMore: (
        fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, UserCitiesWeatherQuery>,
    ) => Promise<ApolloQueryResult<UserCitiesWeatherQuery>>;
};

export type WeatherForecast = {
    id?: string;
    city: string;
    celsius: number;
    fahrenheit: number;
    humidity: number;
    text: string;
    precip: number;
    windSpeed: number;
    time?: string;
    daysForecast?: WeatherForecastDays[];
};

export type WeatherForecastDays = {
    text: string;
    dayOfWeek: string;
    celsius: number;
    fahrenheit: number;
    humidity: number;
    precip: number;
    windSpeed: number;
    minCelsius: number;
    maxCelsius: number;
    minFahrenheit: number;
    maxFahrenheit: number;
};


const SubscriptionErrorContext = createContext<ContextType | null>(null);

export const useWeatherData = (): ContextType => {
    const subscriptionErrorContext = useContext(SubscriptionErrorContext);

    if (!subscriptionErrorContext) {
        throw new Error('useWeatherData must be used within an WeatherDataProvider');
    }

    return subscriptionErrorContext;
};

export const WeatherDataProvider: FC<PropsWithChildren> = ({ children }) => {
    const { setError, handleError } = useSubscriptionError();
    const { paginationOptions, isFetching, setTotalCount } = useWeatherPaginationQueryOptions();
    const { setCurrentCityWeatherInfo } = useCurrentCityWeatherInfo();
    const { data, error, fetchMore } = useSuspenseQuery(UserCitiesWeatherDocument, {
        variables: {
            ...paginationOptions,
            forecastDaysAmount: MAX_FORECAST_DAYS,
        },
        fetchPolicy: 'cache-and-network',
        
        // notifyOnNetworkStatusChange: true,
        // fetchPolicy: getFetchPolicyForKey(
        //   'weatherData',
        //   ONE_MINUTE * WEATHER_FORECAST_CACHE_MINUTES_TIME,
        // ),
    });

    console.log(data.userCitiesWeather.edges.map(item => item.city))

    useEffect(() => {
        // if (loading) {
        //   setError({ message: '' });
        // }

        if (error) {
            handleError(error);
        }

        if (data) {
            setTotalCount(data.userCitiesWeather.paginationInfo?.totalCount ?? 0);
            setCurrentCityWeatherInfo({ info: data.userCitiesWeather.edges[0] });
        }
    }, [data, error, setError, handleError, setCurrentCityWeatherInfo]);

    const contextValue: ContextType = {
        data,
        error,
        loading: isFetching,
        fetchMore
    }

    return (
        <SubscriptionErrorContext.Provider value={contextValue}>
            {children}
        </SubscriptionErrorContext.Provider>
    );
};

