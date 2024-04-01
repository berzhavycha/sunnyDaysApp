import React, { useRef, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { CustomTouchable } from '../CustomTouchable';

type Props<T> = {
    data: T[];
    renderItem: (item: T) => JSX.Element;
    itemsPerPage: number;
    showPagination?: boolean;
    showArrows?: boolean;
}

export const CustomSwiper = <T,>({ data, renderItem, itemsPerPage, showPagination = false, showArrows = false }: Props<T>): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const { width: screenWidth } = Dimensions.get('window');

    const numPages = Math.ceil(data.length / itemsPerPage);

    const handleNext = (): void => {
        const nextPage = currentPage + 1;
        if (nextPage < numPages) {
            setCurrentPage(nextPage);
            const nextOffset = nextPage * screenWidth * itemsPerPage;
            scrollViewRef.current?.scrollTo({ x: nextOffset, animated: true });
        }
    };

    const handlePrev = (): void => {
        const prevPage = currentPage - 1;
        if (prevPage >= 0) {
            setCurrentPage(prevPage);
            const prevOffset = prevPage * screenWidth * itemsPerPage;
            scrollViewRef.current?.scrollTo({ x: prevOffset, animated: true });
        }
    };

    const handlePagination = (index: number): void => {
        setCurrentPage(index);

        const offset = index * screenWidth * itemsPerPage;
        scrollViewRef.current?.scrollTo({ x: offset, animated: true });
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const itemWidth = screenWidth / (data.length || 1);

        const scrollEndX = offsetX + itemWidth * itemsPerPage;
        const nextThresholdX = (currentPage + 1) * itemWidth * (itemsPerPage + 1);
        const currentThresholdX = currentPage * itemWidth * (itemsPerPage + 1);

        if (scrollEndX >= nextThresholdX) {
            if (currentPage !== numPages - 1) {
                setCurrentPage(currentPage + 1);
            }
        } else if (scrollEndX < currentThresholdX && currentPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <View>
            <ScrollView
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View className='flex-row gap-1'>
                    {data.map((item, index) => (
                        <View key={index} style={{ width: screenWidth / (itemsPerPage + 1), justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            {renderItem(item)}
                        </View>
                    ))}
                </View>
            </ScrollView>
            {showArrows && (
                <View className='flex-row justify-between px-5 mt-4'>
                    <TouchableOpacity onPress={handlePrev}>
                        <Text>{'<'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <Text>{'>'}</Text>
                    </TouchableOpacity>
                </View>
            )}
            {showPagination && data.length !== itemsPerPage && (
                <View className='w-full justify-center flex-row mt-2'>
                    {Array.from(Array(numPages).keys()).map((index) => (
                        <CustomTouchable key={index} onPress={() => handlePagination(index)}>
                            <View style={{ width: 10, height: 10, borderRadius: 6, backgroundColor: index === currentPage ? '#3b82f6' : '#bfdbfe', marginHorizontal: 5 }} />
                        </CustomTouchable>
                    ))}
                </View>
            )}
        </View>
    );
};
