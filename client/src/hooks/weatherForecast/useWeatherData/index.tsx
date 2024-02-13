import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { WeatherCardProps } from '@/components/weatherForecast/WeatherForecastDisplay/components/SwipeableWeatherCard/components/WeatherCard';
import { SwipeableWeatherCard } from '@/components/weatherForecast/WeatherForecastDisplay/components/SwipeableWeatherCard';
import { useDeleteSubscription } from '@/components/weatherForecast/WeatherForecastDisplay/components/WeatherCardsList/hooks';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';
import { Env } from '@/env';

type RenderItemProps = {
  item: WeatherCardProps;
};

type WeatherDataReturn = {
  data: UserCitiesWeatherQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  renderItem(props: RenderItemProps): JSX.Element;
};

export const useWeatherData = (): WeatherDataReturn => {
  const { deleteSubscriptionHandler } = useDeleteSubscription();
  const { data, loading, error } = useQuery(UserCitiesWeatherDocument, {
    variables: {
      citiesLimit: Env.MAX_WEATHER_CITIES_AMOUNT,
      forecastDaysAmount: Env.MAX_FORECAST_DAYS,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: getFetchPolicyForKey(
      'weatherData',
      ONE_MINUTE * Env.WEATHER_FORECAST_CACHE_TIME,
    ),
  });

  function renderItem({ item }: RenderItemProps): JSX.Element {
    const onDelete = async (): Promise<void> => deleteSubscriptionHandler(item.city);

    return <SwipeableWeatherCard item={item} onDelete={onDelete} />;
  }

  return { data, loading, error, renderItem };
};
