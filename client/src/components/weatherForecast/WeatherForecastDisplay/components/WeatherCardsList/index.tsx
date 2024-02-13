import { FlatList } from 'react-native';

import { NoData } from '@/components/common';
import { useWeatherData } from '@/hooks';
import { SpinnerView } from '../SpinnerView';
import { useRenderWeatherCard } from './hooks';
import { useAddSubscription } from '../WeatherHeader/components/WeatherHeaderDown/hooks';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading } = useWeatherData();
  const { renderItem } = useRenderWeatherCard();
  const { loading: additionLoading } = useAddSubscription();

  const keyExtractor = (item: { city: string }): string => item.city;

  return (
    <>
      {loading || additionLoading ? (
        <SpinnerView />
      ) : !data?.userCitiesWeather.length ? (
        <NoData message="No weather information available" />
      ) : (
        <FlatList
          className="w-full"
          data={data.userCitiesWeather}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
