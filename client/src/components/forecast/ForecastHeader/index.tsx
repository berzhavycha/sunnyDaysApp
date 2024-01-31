import React from 'react';
import { View } from 'react-native';
import { ForecastHeaderTop, ForecastHeaderDown } from './components';

export const ForecastHeader = (): JSX.Element => {
  return (
    <View>
      <ForecastHeaderTop />
      <ForecastHeaderDown />
    </View>
  );
};
