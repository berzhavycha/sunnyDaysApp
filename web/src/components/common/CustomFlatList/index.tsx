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
    <div className={`w-full flex flex-col justify-between h-full ${className}`}>
      <div className={className}>
        {data.map((item) => (
          <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
        ))}
      </div>
      {listFooterComponent && <div className="mb-12">{listFooterComponent}</div>}
    </div>
  );
};
