import { ApolloError, useMutation, useQuery } from '@apollo/client';
import {
    DELETE_WEATHER_SUBSCRIPTION,
    GET_USER_CITIES_WEATHER,
} from '@/apollo';
import { REACT_APP_FETCH_CITY_AMOUNT, REACT_APP_MAX_FORECAST_DAYS } from '@env';
import { WeatherCardProps } from '@/components/forecast/WeatherCard';

type QueryWeatherData = {
    getUserCitiesWeather: WeatherCardProps[]
}

type WeatherData = {
    data: QueryWeatherData | undefined;
    loading: boolean;
    error: ApolloError | undefined;
    deleteHandler: (city: string) => Promise<void>;
}

export const useWeatherData = (): WeatherData => {
    const { data, loading, error } = useQuery(GET_USER_CITIES_WEATHER, {
        variables: {
            forecastParams: {
                citiesLimit: REACT_APP_FETCH_CITY_AMOUNT,
                forecastDaysAmount: REACT_APP_MAX_FORECAST_DAYS,
            },
        },
        notifyOnNetworkStatusChange: true,
    });

    const [deleteWeatherSubscription] = useMutation(
        DELETE_WEATHER_SUBSCRIPTION,
        {
            refetchQueries: [GET_USER_CITIES_WEATHER],
        }
    );

    const deleteHandler = async (city: string): Promise<void> => {
        await deleteWeatherSubscription({
            variables: {
                city,
            },
        });
    };

    return { data, loading, error, deleteHandler };
};
