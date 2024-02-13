import { FC, memo } from 'react';
import { Text } from 'react-native';

import { CustomTouchable } from '../CustomTouchable';

type Props = {
  text: string;
  onPress: () => void;
};

export const Button: FC<Props> = memo(({ text, onPress }) => {
  return (
    <CustomTouchable
      onPress={onPress}
      style={{ backgroundColor: '#2563eb', padding: 12, borderRadius: 5 }}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center font-bold">{text}</Text>
    </CustomTouchable>
  );
});
