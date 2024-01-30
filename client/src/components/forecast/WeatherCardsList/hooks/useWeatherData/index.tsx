import { ApolloError, useQuery } from '@apollo/client';
import { GET_USER_CITIES_WEATHER, } from './queries';
import { REACT_APP_MAX_WEATHER_CITIES_AMOUNT, REACT_APP_MAX_FORECAST_DAYS, REACT_APP_WEATHER_FORECAST_CACHE_TIME } from '@env';
import { WeatherCardProps } from '@/components/forecast/WeatherCard';
import { SwipeableWeatherCard } from '@/components/forecast/SwipeableWeatherCard';
import { useWeatherSubscription } from '@/hooks';
import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';

type QueryWeatherData = {
    userCitiesWeather: WeatherCardProps[]
}

type WeatherData = {
    data: QueryWeatherData | undefined;
    loading: boolean;
    error: ApolloError | undefined;
    renderItem({ item }: { item: WeatherCardProps }): JSX.Element
}

export const useWeatherData = (): WeatherData => {
    const { deleteSubscriptionHandler } = useWeatherSubscription()
    const { data, loading, error } = useQuery(GET_USER_CITIES_WEATHER, {
        variables: {
            forecastParams: {
                citiesLimit: +REACT_APP_MAX_WEATHER_CITIES_AMOUNT,
                forecastDaysAmount: +REACT_APP_MAX_FORECAST_DAYS,
            },
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: getFetchPolicyForKey("weatherData", ONE_MINUTE * REACT_APP_WEATHER_FORECAST_CACHE_TIME)
    });

    function renderItem({ item }: { item: WeatherCardProps }): JSX.Element {
        return (
            <SwipeableWeatherCard
                item={item}
                onDelete={() => deleteSubscriptionHandler(item.city)}
            />
        );
    }

    return { data, loading, error, renderItem };
};
