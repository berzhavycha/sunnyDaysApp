import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { CustomTouchable } from '../../CustomTouchable';
import { ActiveOpacity } from '../../CustomTouchable/constants';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export const CloseButton: FC<Props> = memo(({ onPress }) => {
  return (
    <CustomTouchable onPress={onPress} style={styles.container} activeOpacity={ActiveOpacity.HIGH}>
      <Feather name="x-circle" size={20} color="white" />
    </CustomTouchable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
