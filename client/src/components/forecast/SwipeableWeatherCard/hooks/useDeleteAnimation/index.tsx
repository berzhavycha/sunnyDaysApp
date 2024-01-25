import { useRef } from "react";
import { Animated } from "react-native";

type SwipeAnimationHookReturn = {
    opacityAnimatedValue: Animated.Value;
    animateOnDelete: () => void;
};

export const useDeleteAnimation = (onSwipeRight: () => void): SwipeAnimationHookReturn => {
    const opacityAnimatedValue = useRef(new Animated.Value(1)).current;

    const animateOnDelete = (): void => {
        Animated.timing(opacityAnimatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            onSwipeRight();
        });
    };

    return {
        opacityAnimatedValue,
        animateOnDelete,
    };
};
