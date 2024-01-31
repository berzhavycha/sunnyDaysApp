import { Dispatch, SetStateAction, ReactElement, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Input } from '../Input';
import OutsidePressHandler from 'react-native-outside-press';

type Props<TItem> = {
  loading: boolean;
  data: TItem[];
  onRenderItem: ({ item }: { item: TItem }) => JSX.Element;
  search: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
  error: string;
};

export const InputAutocomplete: <TItem>(props: Props<TItem>) => ReactElement<Props<TItem>> = ({
  loading,
  data,
  onRenderItem,
  search,
  onSearchChange,
  placeholder,
  error,
}) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const onPressOutside = (): void => {
    setIsInputFocused(true);
  };

  return (
    <OutsidePressHandler
      onOutsidePress={onPressOutside}
      style={{ position: 'relative', zIndex: 65000 }}
    >
      <Input
        value={search}
        onChange={onSearchChange}
        placeholder={placeholder}
        icon="search"
        error={error}
        onFocus={() => setIsInputFocused(true)}
      />
      {!loading && data && isInputFocused && (
        <View className='absolute top-14 bg-gray-800 rounded w-full z-10 shadow-xl'>
          <FlatList
            data={data}
            renderItem={({ item }) => onRenderItem({ item })}
          />
        </View>
      )}
    </OutsidePressHandler >
  );
};
