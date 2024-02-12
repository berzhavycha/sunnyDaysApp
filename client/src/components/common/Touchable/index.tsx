import React, { FC, useCallback } from 'react';
import { PressableProps, Pressable as RNPressable, ViewStyle } from 'react-native';

type TouchableProps = {
    activeOpacity: number,
    className?: string
}

export const Touchable: FC<TouchableProps & PressableProps> = ({ children, style, className, activeOpacity, ...otherProps }): JSX.Element => {
    const _style = useCallback(
        ({ pressed }: { pressed: boolean }) => {
            const baseStyle: ViewStyle = {
                opacity: pressed ? activeOpacity : 1,
            };
            return typeof style === 'object' && style !== null ? { ...baseStyle, ...style } : baseStyle;
        },
        [style, activeOpacity]
    );

    return (
        <RNPressable style={_style} className={className} {...otherProps}>
            {children}
        </RNPressable>
    );
}
