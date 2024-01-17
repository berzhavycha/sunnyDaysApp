import { Feather } from '@expo/vector-icons'
import { Dispatch, FC, SetStateAction } from 'react'
import { View, TextInput, Text } from 'react-native'

type IProps = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    placeholder: string,
    icon: "mail" | "lock" | "key",
    error: string,
    isSecured?: boolean
}

export const Input: FC<IProps> = ({ value, onChange, placeholder, icon, error, isSecured }) => {
    return (
        <View className='relative'>
            <Feather name={icon} size={20} color="#ccc" style={{ position: 'absolute', top: 12, left: 12, zIndex: 100 }} />
            <TextInput
                secureTextEntry={isSecured}
                className='pl-11 py-2 w-64 mb-1 text-white rounded bg-gray-800'
                placeholderTextColor='#ccc'
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => onChange(text)}
            />
            <Text className='w-64 text-xs text-red-500 mb-1'>{error}</Text>
        </View>
    )
}

