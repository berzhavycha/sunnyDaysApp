import React from 'react';
import { View } from 'react-native';
import { WeatherCard } from '../WeatherCard';

export const WeatherCardsList = (): JSX.Element => {
  return (
    <View className="w-full">
      <WeatherCard
        city="Lviv"
        temperature="25°C"
        description="Cloudy"
        rain="20%"
        weatherImage={require('@/assets/images/weather-icon.png')}
      />
    </View>
  );
};
