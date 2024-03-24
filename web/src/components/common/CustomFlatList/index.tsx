import { Fragment } from 'react';

interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  listFooterComponent?: JSX.Element | null;
  className: string;
  keyExtractor: (item: T) => string;
}

export const CustomFlatList = <T,>({
  data,
  renderItem,
  listFooterComponent,
  className,
  keyExtractor,
}: FlatListProps<T>): JSX.Element => {
  return (
    <div className="w-full flex flex-col justify-between lg:h-full">
      <div className={className}>
        {data.map((item) => (
          <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
        ))}
      </div>
      {listFooterComponent && (
        <div className="mt-12 mb-0 lg:-mt-16 lg:mb-28 xl:mt-0 xl:mb-16">{listFooterComponent}</div>
      )}
    </div>
  );
};
