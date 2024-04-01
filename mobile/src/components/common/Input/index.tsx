import { Feather } from '@expo/vector-icons';
import { FC, memo, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { upperCaseFirstLetter } from '@/shared';

import { CustomTouchable, ActiveOpacity } from '../CustomTouchable';

export interface InputProps extends TextInputProps {
  icon: 'mail' | 'lock' | 'key' | 'search';
  error: string;
  isSecured?: boolean;
}

export const Input: FC<InputProps> = memo(
  ({ value, onChangeText, placeholder, icon, error, isSecured, onFocus, onBlur, ...rest }) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(Boolean(isSecured));

    const toggleShowPassword = (): void => {
      setIsPasswordShown(!isPasswordShown);
    };

    return (
      <View className="relative">
        <Feather
          name={icon}
          size={20}
          color="#ccc"
          style={{ position: 'absolute', top: 12, left: 12, zIndex: 100 }}
        />
        <TextInput
          secureTextEntry={isPasswordShown}
          className="pl-11 py-2 w-full mb-1 text-white rounded bg-gray-800"
          placeholderTextColor="#ccc"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        {isSecured && (
          <CustomTouchable
            style={{ position: 'absolute', top: 12, right: 12, zIndex: 100 }}
            onPress={toggleShowPassword}
            activeOpacity={ActiveOpacity.MEDIUM}
          >
            <Feather name={isPasswordShown ? 'eye' : 'eye-off'} size={20} color="#ccc" />
          </CustomTouchable>
        )}
        <Text className="text-xs text-red-500 mb-3">{error && upperCaseFirstLetter(error)}</Text>
      </View>
    );
  },
);
