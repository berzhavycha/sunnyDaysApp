import React from 'react';
import { View } from 'react-native';
import { ForecastHeaderTop } from '../ForecastHeaderTop';
import { ForecastHeaderDown } from '../ForecastHeaderDown';

export const ForecastHeader = (): JSX.Element => {
  return (
    <View>
      <ForecastHeaderTop />
      <ForecastHeaderDown />
    </View>
  );
};
