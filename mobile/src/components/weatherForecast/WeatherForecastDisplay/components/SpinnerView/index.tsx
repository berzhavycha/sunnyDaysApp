import { FC } from 'react';
import { View } from 'react-native';

import { BackgroundSpinner } from '@/components/common';

export const SpinnerView: FC = () => (
  <View className="w-full h-3/4 flex-row justify-center item-center">
    <BackgroundSpinner />
  </View>
);
