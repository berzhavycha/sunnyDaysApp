import { Feather } from '@expo/vector-icons'
import { FC } from 'react'
import { View, TextInput } from 'react-native'

type IProps = {
    placeholder: string,
    icon: "mail" | "lock" | "key"
}

export const Input: FC<IProps> = ({ placeholder, icon }) => {
    return (
        <View className='relative'>
            <Feather name={icon} size={20} color="#ccc" style={{ position: 'absolute', top: 12, left: 12, zIndex: 100 }} />
            <TextInput
                className='pl-11 py-2 w-64 mb-4 text-white rounded bg-gray-800'
                placeholderTextColor='#ccc'
                placeholder={placeholder}
            />
        </View>
    )
}

