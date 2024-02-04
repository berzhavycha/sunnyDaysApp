import { Dispatch, FC, SetStateAction, memo, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { upperCaseFirstLetter } from '@/utils';
import { Feather } from '@expo/vector-icons';

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
  icon: 'mail' | 'lock' | 'key' | 'search';
  error: string;
  isSecured?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Input: FC<Props> = memo(
  ({ value, onChange, placeholder, icon, error, isSecured, onFocus, onBlur }) => {
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
          onChangeText={(text) => onChange(text)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {isSecured && (
          <TouchableOpacity className="absolute top-3 right-3 z-100" onPress={toggleShowPassword}>
            <Feather name={isPasswordShown ? 'eye' : 'eye-off'} size={20} color="#ccc" />
          </TouchableOpacity>
        )}
        <Text className="text-xs text-red-500 mb-3">{error && upperCaseFirstLetter(error)}</Text>
      </View>
    );
  },
);
