import { Feather } from '@expo/vector-icons';
import { FC, memo } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { CustomTouchable, ActiveOpacity } from '@/components/common';
import { WeatherForecast } from '@/hooks';

import { WeatherCard } from './components';

type Props = {
  item: WeatherForecast;
  onDelete: () => void;
};

export const SwipeableWeatherCard: FC<Props> = memo(({ item, onDelete }): JSX.Element => {
  return (
    <Swipeable
      renderRightActions={() => (
        <Animated.View style={styles.rightActions}>
          <CustomTouchable
            activeOpacity={ActiveOpacity.MEDIUM}
            style={styles.touchable}
            onPress={onDelete}
          >
            <Text className="text-white">
              <Feather name="trash-2" size={30} color="#ccc" />
            </Text>
          </CustomTouchable>
        </Animated.View>
      )}
      overshootRight={false}
    >
      <Animated.View>
        <WeatherCard key={item.city} info={item} />
      </Animated.View>
    </Swipeable >
  );
});


const styles = StyleSheet.create({
  rightActions: {
    backgroundColor: 'red',
    width: 80,
    height: '95%',
    borderRadius: 10,
  },
  touchable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});