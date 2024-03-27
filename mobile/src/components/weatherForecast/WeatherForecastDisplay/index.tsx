import { FC } from 'react';
import { View } from 'react-native';

import { WeatherHeader, WeatherCardsList } from './components';

export const WeatherForecastDisplay: FC = () => {
  return (
    <View className="w-full flex-1 pt-12 justify-start items-start pl-6 pr-6 bg-gray-900">
      <WeatherHeader />
      <WeatherCardsList />
    </View>
  );
};
