import { FC } from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  message: string;
};

export const NoData: FC<Props> = ({ message }): JSX.Element => {
  return (
    <View className="w-full h-4/6 flex-column justify-center item-center">
      <Image
        source={require('@/assets/images/not-found.png')}
        className="w-40 h-40 justify-center items-center self-center mb-4"
      />
      <Text className="text-center text-[18px] text-gray-400">{message}</Text>
    </View>
  );
};
