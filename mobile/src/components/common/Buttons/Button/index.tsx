import { FC, memo } from 'react';
import { Text } from 'react-native';

import { CustomTouchable } from '../../CustomTouchable';
import { ActiveOpacity } from '../../CustomTouchable/constants';

type Props = {
  text: string;
  onPress: () => void;
};

export const Button: FC<Props> = memo(({ text, onPress }) => {
  return (
    <CustomTouchable
      onPress={onPress}
      style={{ backgroundColor: '#2563eb', padding: 12, borderRadius: 5 }}
      activeOpacity={ActiveOpacity.HIGH}
    >
      <Text className="text-white text-center font-bold">{text}</Text>
    </CustomTouchable>
  );
});
