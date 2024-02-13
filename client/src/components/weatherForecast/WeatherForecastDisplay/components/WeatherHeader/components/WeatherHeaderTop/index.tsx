import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useSignOut } from '@/hooks';
import { CustomTouchable } from '@/components/common'

export const WeatherHeaderTop = (): JSX.Element => {
  const { signOutHandler } = useSignOut();

  return (
    <View className="w-full flex-row items-center mb-4 justify-between">
      <View>
        <Text className="text-white text-lg">Manage Cities</Text>
      </View>
      <View>
        <CustomTouchable onPress={signOutHandler} activeOpacity={0.5}>
          <FontAwesome name="sign-out" size={24} color="#ccc" />
        </CustomTouchable>
      </View>
    </View>
  );
};
