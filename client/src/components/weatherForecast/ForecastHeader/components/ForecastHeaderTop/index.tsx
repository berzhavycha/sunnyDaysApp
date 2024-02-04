import { View, Text, TouchableOpacity } from 'react-native';
import { useSignOut } from '@/hooks';
import { FontAwesome } from '@expo/vector-icons';

export const ForecastHeaderTop = (): JSX.Element => {
  const { signOutHandler } = useSignOut();

  return (
    <View className="w-full flex-row items-center mb-4 justify-between">
      <View>
        <Text className="text-white text-lg">Manage Cities</Text>
      </View>
      <View>
        <TouchableOpacity onPress={async () => await signOutHandler()}>
          <FontAwesome name="sign-out" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
