import React, { FC } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { pickWeatherIcon } from './utils';
import { weatherIconMapping } from '../constants';
import { Feather } from '@expo/vector-icons';
import WeatherCard, { WeatherCardProps } from '../WeatherCard';
import { useSwipeAnimation } from './hooks';

type IProps = {
    item: WeatherCardProps;
    onSwipeableRightOpen: () => void;
}

export const SwipeableWeatherCard: FC<IProps> = ({
    item,
    onSwipeableRightOpen,
}): JSX.Element => {
    const weatherIcon = pickWeatherIcon(item.text);
    const { opacityAnimatedValue, animateOnSwipeRight } = useSwipeAnimation(onSwipeableRightOpen);

    const cardStyle = {
        opacity: opacityAnimatedValue,
    };

    return (
        <Swipeable
            renderRightActions={() => (
                <Animated.View style={[{ opacity: opacityAnimatedValue }, { backgroundColor: 'red', width: 80, height: '95%', borderRadius: 10 }]}>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={animateOnSwipeRight}
                    >
                        <Text style={{ color: 'white' }}>
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
                    tempCelsius={`${item.tempCelsius}°C`}
                    text={item.text}
                    humidity={`${item.humidity}%`}
                    daysForecast={item.daysForecast}
                    weatherImageUri={weatherIconMapping[weatherIcon]}
                />
            </Animated.View>
        </Swipeable>
    );
};