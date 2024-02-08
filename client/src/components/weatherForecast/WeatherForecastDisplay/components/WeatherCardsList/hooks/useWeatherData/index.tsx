import { ApolloError, useQuery } from '@apollo/client';

import { ONE_MINUTE, getFetchPolicyForKey } from '@/utils';
import { WeatherCardProps } from '../../../SwipeableWeatherCard/components';
import { SwipeableWeatherCard } from '../../../SwipeableWeatherCard';
import { UserCitiesWeatherDocument, UserCitiesWeatherQuery } from './queries';
import { useDeleteWeatherSubscription } from '../useDeleteWeatherSubscription';
import {
  REACT_APP_MAX_WEATHER_CITIES_AMOUNT,
  REACT_APP_MAX_FORECAST_DAYS,
  REACT_APP_WEATHER_FORECAST_CACHE_TIME,
} from '@env';

type RenderItemProps = {
  item: WeatherCardProps;
};

type WeatherData = {
  data: UserCitiesWeatherQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  renderItem(props: RenderItemProps): JSX.Element;
};

export const useWeatherData = (): WeatherData => {
  const { deleteSubscriptionHandler } = useDeleteWeatherSubscription();
  const { data, loading, error } = useQuery(UserCitiesWeatherDocument, {
    variables: {
      citiesLimit: +REACT_APP_MAX_WEATHER_CITIES_AMOUNT,
      forecastDaysAmount: +REACT_APP_MAX_FORECAST_DAYS,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: getFetchPolicyForKey(
      'weatherData',
      ONE_MINUTE * REACT_APP_WEATHER_FORECAST_CACHE_TIME,
    ),
  });


  function renderItem({ item }: RenderItemProps): JSX.Element {
    const onDelete = async (): Promise<void> => await deleteSubscriptionHandler(item.city)

    return (
      <SwipeableWeatherCard item={item} onDelete={onDelete} />
    );
  }

  return { data, loading, error, renderItem };
};
