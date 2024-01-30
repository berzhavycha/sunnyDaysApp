import React, { Dispatch, SetStateAction, ReactElement, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Input } from '../Input';

type Props<TItem> = {
    loading: boolean;
    data: TItem[]
    onRenderItem: ({ item }: { item: TItem }) => JSX.Element;
    search: string;
    onSearchChange: Dispatch<SetStateAction<string>>,
    placeholder: string;
    error: string;
};

export const InputAutocomplete: <TItem>(
    props: Props<TItem>
) => ReactElement<Props<TItem>> = ({
    loading,
    data,
    onRenderItem,
    search,
    onSearchChange,
    placeholder,
    error
}) => {
        const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

        return (
            <View className='relative'>
                <Input
                    value={search}
                    onChange={onSearchChange}
                    placeholder={placeholder}
                    icon="search"
                    error={error}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />
                {!loading && data && isInputFocused && (
                    <View className='absolute top-14 bg-gray-800 rounded w-full z-10 shadow-xl'>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => setIsInputFocused(true)}>
                                    {onRenderItem({ item })}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        );
    };