import { FC } from 'react';
import { StyleSheet } from 'react-native';

import { CustomTouchable, ActiveOpacity } from '../../CustomTouchable';

type Props = {
  onClick: () => Promise<void>;
  content: JSX.Element;
  isActive: boolean;
  isNavigator?: boolean;
};

export const TouchablePaginationButton: FC<Props> = ({
  content,
  onClick,
  isActive,
  isNavigator,
}) => {
  const onPress = async (): Promise<void> => await onClick();

  return (
    <CustomTouchable
      style={{
        backgroundColor: !isActive && isNavigator ? '#60a5fa' : '#2563eb',
        borderWidth: isNavigator ? 0 : 1,
        borderColor: isActive ? '#fff' : '#2563eb',
        ...styles.button
      }}
      onPress={onPress}
      activeOpacity={ActiveOpacity.MEDIUM}
    >
      {content}
    </CustomTouchable>
  );
};


const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 40,
    height: 30,
    borderRadius: 10,
    margin: 5,
  },
});