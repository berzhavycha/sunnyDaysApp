import { FlatList } from 'react-native';

import { NoData } from '@/components/common';
import { useWeatherData } from './hooks';
import { SpinnerView } from '../SpinnerView';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading, renderItem } = useWeatherData();

  if (loading) return <SpinnerView />;

  return (
    <>
      {!data?.userCitiesWeather.length ? (
        <NoData message="No weather information available" />
      ) : (
        <FlatList
          className="w-full"
          data={data.userCitiesWeather}
          keyExtractor={(item) => item.city}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
