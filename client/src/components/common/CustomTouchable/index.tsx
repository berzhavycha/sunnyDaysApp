import React, { FC } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';

interface CustomTouchableProps extends PressableProps {
    activeOpacity: number,
    onPress: () => void;
    onLongPress?: () => void;
    style?: ViewStyle;
}

export const CustomTouchable: FC<CustomTouchableProps> = ({ activeOpacity, onPress, onLongPress, children, style, ...props }) => {
    const handleLongPress = (): void => {
        if (onLongPress) {
            onLongPress();
        }
    };

    return (
        <Pressable
            onPress={onPress}
            onLongPress={handleLongPress}
            style={({ pressed }) => [
                style,
                pressed && {
                    opacity: activeOpacity,
                },
            ]}
            {...props}
        >
            {children}
        </Pressable>
    );
};
