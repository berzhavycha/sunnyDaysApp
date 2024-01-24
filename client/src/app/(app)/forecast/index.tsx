import React from 'react';
import { View } from 'react-native';
import { ForecastHeader, WeatherCardsList } from '@/components';

const ForecastScreen = (): JSX.Element => {
  return (
    <View className="flex-1 py-12 justify-start items-start pl-6 pr-6 bg-gray-900">
      <ForecastHeader />
      <WeatherCardsList />
    </View>
  );
};

export default ForecastScreen;
