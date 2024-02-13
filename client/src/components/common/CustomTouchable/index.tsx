import React, { FC } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';

interface CustomTouchableProps extends PressableProps {
    activeOpacity?: number,
    onPress?: () => void;
    onLongPress?: () => void;
    highlightColor?: string;
    style?: ViewStyle;
    noFeedback?: boolean
}

export const CustomTouchable: FC<CustomTouchableProps> = ({ activeOpacity, highlightColor, onPress, onLongPress, children, style, noFeedback, ...props }) => {
    const pressHandler = (): void => {
        if (onPress) {
            onPress();
        }
    };

    const longPressHandler = (): void => {
        if (onLongPress) {
            onLongPress();
        }
    };

    return (
        <Pressable
            onPress={pressHandler}
            onLongPress={longPressHandler}
            style={({ pressed }) => [
                style,
                pressed && {
                    opacity: activeOpacity,
                    backgroundColor: highlightColor ?? style?.backgroundColor
                },
            ]}
            {...props}
            disabled={noFeedback}
        >
            {children}
        </Pressable>
    );
};
