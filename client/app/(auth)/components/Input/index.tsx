import { FC } from 'react'
import { View, TextInput } from 'react-native'

type IProps = {
    placeholder: string
}

export const Input: FC<IProps> = ({ placeholder }) => {
    return (
        <View>
            <TextInput
                className='pl-4 py-2 w-64 mb-4 text-white rounded bg-gray-800'
                placeholderTextColor='white'
                placeholder={placeholder}
            />
        </View>
    )
}

