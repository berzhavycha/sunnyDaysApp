import React from 'react';
import { FlatList } from 'react-native';
import { useWeatherData } from './hooks';
import { SpinnerView } from '../SpinnerView';
import { NoData } from '@/components/common';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading, renderItem } = useWeatherData();

  if (loading) return <SpinnerView />;

  const userCitiesWeather = data?.userCitiesWeather || [];

  return (
    <>
      {!userCitiesWeather.length ? (
        <NoData message="No weather information available" />
      ) : (
        <FlatList
          className="w-full"
          data={userCitiesWeather}
          keyExtractor={(item) => item.city}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
