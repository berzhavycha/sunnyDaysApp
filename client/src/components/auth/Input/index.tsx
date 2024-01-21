import { upperCaseFirstLetter } from '@/utils/upperCaseFirstLetter';
import { Feather } from '@expo/vector-icons';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

type IProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
  icon: 'mail' | 'lock' | 'key';
  error: string;
  isSecured?: boolean;
};

export const Input: FC<IProps> = ({ value, onChange, placeholder, icon, error, isSecured }) => {
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
        className="pl-11 py-2 w-64 mb-1 text-white rounded bg-gray-800"
        placeholderTextColor="#ccc"
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange(text)}
      />
      {isSecured && (
        <TouchableOpacity
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 100 }}
          onPress={toggleShowPassword}
        >
          <Feather name={isPasswordShown ? 'eye' : 'eye-off'} size={20} color="#ccc" />
        </TouchableOpacity>
      )}
      <Text className="w-64 text-xs text-red-500 mb-3">{error && upperCaseFirstLetter(error)}</Text>
    </View>
  );
};
