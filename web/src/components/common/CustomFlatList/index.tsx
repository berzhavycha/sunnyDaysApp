import React from 'react';

interface FlatListProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    listFooterComponent?: React.ReactNode;
    className: string;
}

export const CustomFlatList = <T,>({ data, renderItem, listFooterComponent, className }: FlatListProps<T>): JSX.Element => {
    return (
        <div className={className}>
            {data.map((item) => (
                <>
                    {renderItem(item)}
                </>
            ))}
            {listFooterComponent && (
                <div>{listFooterComponent}</div>
            )}
        </div>
    );
}
