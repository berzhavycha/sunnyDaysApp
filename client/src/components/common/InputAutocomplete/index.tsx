import React, { useEffect, Dispatch, SetStateAction, ReactElement } from 'react';
import { View, FlatList, Text } from 'react-native';
import { DocumentNode, useLazyQuery, OperationVariables } from '@apollo/client';
import { Input } from '../Input';

type Props<TData, TItem, TVariables extends OperationVariables | undefined> = {
    query: DocumentNode;
    variables: TVariables;
    context?: {
        clientName: string;
    };
    renderItem: ({ item }: { item: TItem }) => JSX.Element;
    keyExtractor: (item: TItem) => string;
    dataExtractor: (response: TData) => TItem[];
    search: string;
    setSearch: Dispatch<SetStateAction<string>>,
    placeholder: string;
};

export const InputAutocomplete: <TData, TItem, TVariables extends OperationVariables | undefined>(
    props: Props<TData, TItem, TVariables>
) => ReactElement<Props<TData, TItem, TVariables>> = ({
    query,
    variables,
    context,
    renderItem,
    keyExtractor,
    dataExtractor,
    search,
    setSearch,
    placeholder
}) => {
        const [getQueryItems, { loading, data }] = useLazyQuery(query);

        useEffect(() => {
            if (search.trim() !== '') {
                getQueryItems({
                    variables,
                    context,
                });
            }
        }, [search, getQueryItems]);

        const extractedData = dataExtractor(data);

        return (
            <View className='relative'>
                <Input value={search} onChange={setSearch} placeholder={placeholder} icon="search" error="" />
                {loading && !data ? (
                    <Text className='text-white'>Loading...</Text>
                ) : (
                    <View className='absolute top-14 bg-gray-800 rounded w-full'>
                        <FlatList
                            data={extractedData}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                        />
                    </View>
                )}
            </View>
        );
    };