import { FC } from 'react';
import { View, Text } from 'react-native';

import { TouchablePaginationButton } from '../TouchablePaginationButton';

type Props = {
    currentPage: number;
    paginationPageNumbers: number[];
    onClickPageButton: (page: number) => Promise<void>;
}

export const PaginationPageButtons: FC<Props> = ({ currentPage, paginationPageNumbers, onClickPageButton }): JSX.Element => {
    return (
        <View className="flex-row">
            {paginationPageNumbers.map(page => {
                const isActive = currentPage === page;

                const onClick = async (): Promise<void> => {
                    await onClickPageButton(page);
                };

                const content = (
                    <Text className='text-white font-bold'>
                        {page}
                    </Text>
                );

                return (
                    <TouchablePaginationButton
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
