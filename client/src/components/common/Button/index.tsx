import { FC, memo } from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
};

export const Button: FC<Props> = memo(({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} className="bg-blue-600 p-3 rounded">
      <Text className="text-white text-center font-bold">{text}</Text>
    </Pressable>
  );
});
