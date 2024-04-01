import { Dispatch, RefObject, SetStateAction } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

type Params = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  scrollViewRef: RefObject<ScrollView>;
  screenWidth: number;
  dataLength: number;
  itemsPerPage: number;
  numPages: number;
};

type HookReturn = {
  paginationHandler: (index: number) => void;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const useSwiper = ({
  currentPage,
  setCurrentPage,
  scrollViewRef,
  screenWidth,
  dataLength,
  itemsPerPage,
  numPages,
}: Params): HookReturn => {
  const paginationHandler = (index: number): void => {
    setCurrentPage(index);

    const offset = index * screenWidth * itemsPerPage;
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
  };

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = screenWidth / (dataLength || 1);

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

  return {
    paginationHandler,
    scrollHandler,
  };
};
