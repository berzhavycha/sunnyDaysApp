import { View } from 'react-native';

import { WeatherHeaderTop, WeatherHeaderDown } from './components';

export const WeatherHeader = (): JSX.Element => {
  return (
    <View>
      <WeatherHeaderTop />
      <WeatherHeaderDown />
    </View>
  );
};
