import { ActivityIndicator, View } from 'react-native';

export const Spinner = (): JSX.Element => (
  <View className="flex-1 w-full h-full justify-center items-center bg-gray-900">
    <View>
      <ActivityIndicator size="large" color="#3b82f6" />
    </View>
  </View>
);