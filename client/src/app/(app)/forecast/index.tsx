import React from 'react';
import { View } from 'react-native';
import { ForecastHeader } from '@/components/forecast/ForecastHeader';

const ForecastScreen = (): JSX.Element => {
  return (
    <View className="flex-1 py-12 justify-start items-start px-6 bg-gray-900">
      <ForecastHeader />
    </View>
  );
};

export default ForecastScreen;
