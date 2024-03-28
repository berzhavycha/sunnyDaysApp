'use client';

import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';

import { CloseButton } from '../Buttons';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  zIndex?: number;
}>;

export const ModalBackground: FC<Props> = ({ isVisible, onClose, zIndex, children }) => {
  return (
    <>
      {isVisible && (
        <View
          className={`absolute top-0 left-0 w-screen h-screen bg-black/[.6] z-${zIndex ?? 1000}`}
        >
          <View className="absolute top-4 right-2 p-4">
            <CloseButton onPress={onClose} />
          </View>
          <View className="w-full h-full flex justify-center items-center">
            <OutsidePressHandler onOutsidePress={onClose}>
              <View>{children}</View>
            </OutsidePressHandler>
          </View>
        </View>
      )}
    </>
  );
};
