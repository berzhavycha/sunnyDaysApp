import { View } from 'react-native';
import { Spinner } from '@/components/common';

export const SpinnerView = (): JSX.Element => (
  <View className="w-full h-3/4 flex-row justify-center item-center">
    <Spinner />
  </View>
);
