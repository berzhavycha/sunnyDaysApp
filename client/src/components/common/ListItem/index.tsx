import { FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  content: string;
  onItemClick: (text: string) => void;
};

export const ListItem: FC<Props> = memo(({ content, onItemClick }): JSX.Element => {
  return (
    <TouchableOpacity className="w-full" onPress={() => onItemClick(content)}>
      <View className="w-full p-2">
        <Text className="w-full text-white">{content}</Text>
      </View>
    </TouchableOpacity>
  );
});
