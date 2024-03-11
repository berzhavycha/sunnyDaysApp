import React from 'react';

interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  listFooterComponent?: React.ReactNode;
  className: string;
}

export const CustomFlatList = <T,>({
  data,
  renderItem,
  listFooterComponent,
  className,
}: FlatListProps<T>): JSX.Element => {
  return (
    <div className={`w-full flex flex-col justify-between h-full ${className}`}>
      <div className={className}>
        {data.map((item) => (
          <>{renderItem(item)}</>
        ))}
      </div>
      {listFooterComponent && <div className='mb-12'>{listFooterComponent}</div>}
    </div>
  );
};
