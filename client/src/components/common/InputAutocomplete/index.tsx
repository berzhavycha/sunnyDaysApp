import React, { Dispatch, SetStateAction, ReactElement } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Input } from '../Input';

type Props<TItem> = {
  loading: boolean;
  data: TItem[];
  onRenderItem: ({ item }: { item: TItem }) => JSX.Element;
  search: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

export const InputAutocomplete: <TItem>(props: Props<TItem>) => ReactElement<Props<TItem>> = ({
  loading,
  data,
  onRenderItem,
  search,
  onSearchChange,
  placeholder,
}) => {
  return (
    <View className="relative">
      <Input
        value={search}
        onChange={onSearchChange}
        placeholder={placeholder}
        icon="search"
        error=""
      />
      {loading && !data ? (
        <Text className="text-white">Loading...</Text>
      ) : (
        <View className="absolute top-14 bg-gray-800 rounded w-full">
          <FlatList data={data} renderItem={onRenderItem} />
        </View>
      )}
    </View>
  );
};
