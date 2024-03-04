import { FC, memo } from 'react';
import { Text, View } from 'react-native';

import { CustomTouchable } from '../CustomTouchable';
import { ActiveOpacity } from '../CustomTouchable/constants';

type Props = {
  content: string;
  onItemClick: (text: string) => void;
};

export const ListItem: FC<Props> = memo(({ content, onItemClick }): JSX.Element => {
  const onPress = (): void => onItemClick(content);

  return (
    <CustomTouchable style={{ width: '100%' }} onPress={onPress} activeOpacity={ActiveOpacity.LOW}>
      <View className="w-full p-2">
        <Text className="w-full text-white">{content}</Text>
      </View>
    </CustomTouchable>
  );
});
