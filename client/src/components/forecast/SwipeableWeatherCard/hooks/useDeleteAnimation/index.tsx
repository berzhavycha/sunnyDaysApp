import { useRef } from "react";
import { Animated } from "react-native";

type SwipeAnimationHookReturn = {
    opacityAnimatedValue: Animated.Value;
    animateOnSwipeRight: () => void;
};

export const useSwipeAnimation = (onSwipeRight: () => void): SwipeAnimationHookReturn => {
    const opacityAnimatedValue = useRef(new Animated.Value(1)).current;

    const animateOnSwipeRight = (): void => {
        Animated.timing(opacityAnimatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            onSwipeRight();
            opacityAnimatedValue.setValue(1);
        });
    };

    return {
        opacityAnimatedValue,
        animateOnSwipeRight,
    };
};
