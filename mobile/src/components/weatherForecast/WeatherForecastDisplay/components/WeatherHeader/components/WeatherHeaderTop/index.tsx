import { FC } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useCurrentTempUnit } from '@/context';
import { useSignOut } from '@/hooks';
import { CustomTouchable } from '@/components/common';
import { tempUnitSigns } from '@/context/CurrentTempUnit/constants';
import { ActiveOpacity } from '@/components/common/CustomTouchable/constants';

export const WeatherHeaderTop: FC = () => {
  const { signOutHandler } = useSignOut();
  const { currentTempUnit, onTempUnitChange } = useCurrentTempUnit();

  return (
    <View className="w-full flex-row items-center mb-4 justify-between">
      <View>
        <Text className="text-white text-lg">Manage Cities</Text>
      </View>
      <View className="flex flex-row gap-8 items-center">
        <View className="flex-row">
          <CustomTouchable
            onPress={onTempUnitChange}
            style={{
              backgroundColor: '#2563eb',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: 35,
              height: 25,
              borderRadius: 50,
            }}
            activeOpacity={ActiveOpacity.LOW}
            highlightColor="#60a5fa"
          >
            <Text className="text-white font-bold">{tempUnitSigns[currentTempUnit.name]} </Text>
          </CustomTouchable>
        </View>
        <CustomTouchable onPress={signOutHandler} activeOpacity={ActiveOpacity.MEDIUM}>
          <FontAwesome name="sign-out" size={24} color="#ccc" />
        </CustomTouchable>
      </View>
    </View>
  );
};
