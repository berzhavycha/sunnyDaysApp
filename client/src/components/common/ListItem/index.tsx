import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
    content: string,
    onItemClick: (text: string) => void
}

export const ListItem: FC<Props> = ({ content, onItemClick }): JSX.Element => {
    return (
        <TouchableOpacity className='w-full p-2' onPress={() => onItemClick(content)}>
            <Text className='w-full text-white'>{content}</Text>
        </TouchableOpacity>
    );
};
