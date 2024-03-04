import React from 'react';
import { View, Text } from 'react-native';
import { useWeatherPaginationQueryOptions } from '@/context';
import { PaginationButton } from '@/components/common';
import { useWeatherPagination } from '@/hooks';

export const PaginationPageButtons = (): JSX.Element => {
    const { currentPage } = useWeatherPaginationQueryOptions();
    const { paginationPageNumbers, goToPage } = useWeatherPagination();

    return (
        <View className="flex-row">
            {paginationPageNumbers.map(page => {
                const isActive = currentPage === page;

                const onClick = async (): Promise<void> => {
                    await goToPage(page);
                };

                const content = (
                    <Text className='text-white font-bold'>
                        {page}
                    </Text>
                );

                return (
                    <PaginationButton
                        key={page}
                        content={content}
                        isActive={isActive}
                        onClick={onClick}
                    />
                );
            })}
        </View>
    );
};
