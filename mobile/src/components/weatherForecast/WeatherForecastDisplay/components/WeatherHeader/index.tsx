import { FC } from 'react';
import { View } from 'react-native';

import { WeatherHeaderDown, WeatherHeaderTop } from './components';

export const WeatherHeader: FC = () => {
  return (
    <View>
      <WeatherHeaderTop />
      <WeatherHeaderDown />
    </View>
  );
};
