import React from 'react';

interface FlatListProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    listFooterComponent?: React.ReactNode;
    keyArgs?: (item: T, index: number) => React.Key;
}

export const CustomFlatList = <T,>({ data, renderItem, listFooterComponent, keyArgs }: FlatListProps<T>): JSX.Element => {
    return (
        <div>
            {data.map((item, index) => (
                <div key={keyArgs ? keyArgs(item, index) : index}>
                    {renderItem(item)}
                </div>
            ))}
            {listFooterComponent && (
                <div>{listFooterComponent}</div>
            )}
        </div>
    );
}
