import { View, FlatList } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';

import { useCitySearchList } from '@/context';
import { Input } from '../Input';

type Props<TItem> = {
  loading: boolean;
  data: TItem[];
  onRenderItem: ({ item }: { item: TItem }) => JSX.Element;
  search: string;
  onSearchChange: (text: string) => void;
  placeholder: string;
  error: string;
};

export const InputAutocomplete = <TItem,>({
  loading,
  data,
  onRenderItem,
  search,
  onSearchChange,
  placeholder,
  error,
}: Props<TItem>): JSX.Element => {
  const { citySearchList, onPressOutside, onInputFocus } = useCitySearchList()

  return (
    <OutsidePressHandler
      onOutsidePress={onPressOutside}
      style={{ position: 'relative', zIndex: 65000 }}
    >
      <Input
        value={search}
        onChangeText={onSearchChange}
        placeholder={placeholder}
        icon="search"
        error={error}
        onFocus={onInputFocus}
      />
      {!loading && data && citySearchList.isShown && (
        <View className="absolute top-14 bg-gray-800 rounded w-full z-10 shadow-xl">
          <FlatList data={data} renderItem={onRenderItem} />
        </View>
      )}
    </OutsidePressHandler>
  );
};
