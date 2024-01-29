import { ApolloError, useQuery } from '@apollo/client';
import { GET_USER_CITIES_WEATHER, } from './queries';
import { REACT_APP_FETCH_CITY_AMOUNT, REACT_APP_MAX_FORECAST_DAYS } from '@env';
import { WeatherCardProps } from '@/components/forecast/WeatherCard';
import { SwipeableWeatherCard } from '@/components/forecast/SwipeableWeatherCard';
import { useWeatherSubscription } from '@/hooks';

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
                citiesLimit: +REACT_APP_FETCH_CITY_AMOUNT,
                forecastDaysAmount: +REACT_APP_MAX_FORECAST_DAYS,
            },
        },
        notifyOnNetworkStatusChange: true,
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
