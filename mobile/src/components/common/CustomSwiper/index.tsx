import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

import { CustomTouchable } from '../CustomTouchable';

import { useSwiper } from './hooks';

type Props<T> = {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  itemsPerPage: number;
  showPagination?: boolean;
};

export const CustomSwiper = <T,>({
  data,
  renderItem,
  itemsPerPage,
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
          {data.map((item, index) => (
            <View
              key={index}
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
          {Array.from(Array(numPages).keys()).map((index) => {
            const onPaginate = (): void => paginationHandler(index);

            return (
              <CustomTouchable key={index} onPress={onPaginate}>
                <View
                  className="w-3 h-3 rounded-xl mx-1"
                  style={{ backgroundColor: index === currentPage ? '#3b82f6' : '#bfdbfe' }}
                />
              </CustomTouchable>
            );
          })}
        </View>
      )}
    </View>
  );
};
