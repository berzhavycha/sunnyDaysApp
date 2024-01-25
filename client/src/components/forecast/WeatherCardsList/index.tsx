import React from 'react';
import { FlatList } from 'react-native';
import { WeatherCardProps } from '../WeatherCard';
import { SwipeableWeatherCard } from '../SwipeableWeatherCard';
import { useWeatherData } from './hooks';
import { SpinnerView } from '../SpinnerView';
import { ErrorView } from '../ErrorView';
import { NoData } from '@/components/common/NoData';

export const WeatherCardsList = (): JSX.Element => {
  const { data, loading, error, deleteHandler } = useWeatherData();

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

  function renderItem({ item }: { item: WeatherCardProps }): JSX.Element {
    return (
      <SwipeableWeatherCard
        item={item}
        onSwipeableRightOpen={() => deleteHandler(item.city)}
      />
    );
  }
};
