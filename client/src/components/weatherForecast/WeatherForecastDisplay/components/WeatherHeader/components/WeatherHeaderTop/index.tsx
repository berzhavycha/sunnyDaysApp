import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useSignOut } from '@/hooks'; 

export const WeatherHeaderTop = (): JSX.Element => {
  const { signOutHandler } = useSignOut();

  return (
    <View className="w-full flex-row items-center mb-4 justify-between">
      <View>
        <Text className="text-white text-lg">Manage Cities</Text>
      </View>
      <View>
        <TouchableOpacity onPress={signOutHandler}>
          <FontAwesome name="sign-out" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
