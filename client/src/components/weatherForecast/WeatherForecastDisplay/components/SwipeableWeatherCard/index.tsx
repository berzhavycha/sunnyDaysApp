import { FC, memo } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { WeatherCard, WeatherCardProps } from './components/WeatherCard';
import { useDeleteAnimation } from './hooks';

type Props = {
  item: WeatherCardProps;
  onDelete: () => void;
};

export const SwipeableWeatherCard: FC<Props> = memo(({ item, onDelete }): JSX.Element => {
  const { opacityAnimatedValue, animateOnDelete } = useDeleteAnimation(onDelete);

  const cardStyle = {
    opacity: opacityAnimatedValue,
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <Animated.View
          style={[
            { opacity: opacityAnimatedValue },
            { backgroundColor: 'red', width: 80, height: '95%', borderRadius: 10 },
          ]}
        >
          <TouchableOpacity
            className="flex-1 justify-center items-center"
            onPress={animateOnDelete}
          >
            <Text className="text-white">
              <Feather name="trash-2" size={30} color="#ccc" />
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      overshootRight={false}
    >
      <Animated.View style={cardStyle}>
        <WeatherCard
          key={item.city}
          city={item.city}
          tempCelsius={item.tempCelsius}
          text={item.text}
          humidity={item.humidity}
          daysForecast={item.daysForecast}
        />
      </Animated.View>
    </Swipeable>
  );
});
