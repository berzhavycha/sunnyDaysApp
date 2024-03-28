import { FC } from 'react';
import { View } from 'react-native';

import { PlainSpinner } from '../PlainSpinner';

export const BackgroundSpinner: FC = () => (
  <View className="flex-1 w-full h-full justify-center items-center bg-gray-900">
    <View>
      <PlainSpinner />
    </View>
  </View>
);
