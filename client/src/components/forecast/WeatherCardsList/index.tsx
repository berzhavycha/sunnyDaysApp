import React from 'react';
import { FlatList } from 'react-native';
import { useWeatherData } from './hooks';
import { SpinnerView } from '../SpinnerView';
import { ErrorView } from '../ErrorView';
import { NoData } from '@/components/common';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading, error, renderItem } = useWeatherData();

  if (loading) return <SpinnerView />;
  if (error) return <ErrorView />;

  const userCitiesWeather = data?.getUserCitiesWeather || [];

  return (
    <>
      {!userCitiesWeather.length ? (
        <NoData message='No weather information available' />
      ) : (
        <FlatList
          className='w-full'
          data={userCitiesWeather}
          keyExtractor={(item) => item.city}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};
