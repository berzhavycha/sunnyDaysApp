import { FlatList } from 'react-native';

import { NoData } from '@/components/common';
import { useWeatherData } from '@/hooks';
import { SpinnerView } from '../SpinnerView';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading, renderItem } = useWeatherData();

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
