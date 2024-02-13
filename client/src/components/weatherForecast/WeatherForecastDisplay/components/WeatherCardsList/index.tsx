import { FlatList } from 'react-native';

import { NoData } from '@/components/common';
import { useWeatherData } from '@/hooks';
import { SpinnerView } from '../SpinnerView';
import { useRenderWeatherCard } from './hooks';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading } = useWeatherData();
  const {renderItem} = useRenderWeatherCard()

  const keyExtractor = (item: { city: string }): string => item.city;

  return (
    <>
      {loading ? (
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
