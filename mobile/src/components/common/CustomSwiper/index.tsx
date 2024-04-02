import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

import { CustomTouchable } from '../CustomTouchable';

import { useSwiper } from './hooks';

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  keyExtractor: (item: T) => string;
  itemsPerPage: number;
  showPagination?: boolean;
};

export const CustomSwiper = <T,>({
  data,
  renderItem,
  itemsPerPage,
  keyExtractor,
  showPagination = false,
}: Props<T>): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');

  const numPages = Math.ceil(data.length / itemsPerPage);

  const { paginationHandler, scrollHandler } = useSwiper({
    currentPage,
    setCurrentPage,
    scrollViewRef,
    screenWidth,
    numPages,
    dataLength: data.length,
    itemsPerPage,
  });

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View className="flex-row gap-1">
          {data.map((item) => (
            <View
              key={keyExtractor(item)}
              style={{ width: screenWidth / (itemsPerPage + 1) }}
              className="flex justify-center items-center flex-1"
            >
              {renderItem(item)}
            </View>
          ))}
        </View>
      </ScrollView>
      {showPagination && data.length !== itemsPerPage && (
        <View className="w-full justify-center flex-row mt-2">
          {Array.from(Array(numPages).keys()).map((page) => {
            const onPaginate = (): void => paginationHandler(page);

            return (
              <CustomTouchable key={page} onPress={onPaginate}>
                <View
                  className="w-3 h-3 rounded-xl mx-1"
                  style={{ backgroundColor: page === currentPage ? '#3b82f6' : '#bfdbfe' }}
                />
              </CustomTouchable>
            );
          })}
        </View>
      )}
    </View>
  );
};
