import { Feather } from '@expo/vector-icons';
import { FC } from 'react';
import { View } from 'react-native';

import { PaginationPageButtons } from '../PaginationPageButtons';
import { TouchablePaginationButton } from '../TouchablePaginationButton';

type Props = {
  startPageNumber: number;
  currentPage: number;
  paginationPageNumbers: number[];
  totalPages: number;
  onClickPageButton: (page: number) => Promise<void>;
  onClickNext: () => Promise<void>;
  onClickPrev: () => Promise<void>;
};

export const PaginationButtons: FC<Props> = ({
  startPageNumber,
  currentPage,
  paginationPageNumbers,
  onClickPageButton,
  onClickNext,
  onClickPrev,
  totalPages,
}): JSX.Element => {
  const isPrevBtnActive = currentPage !== startPageNumber;
  const isNextBtnActive = currentPage < totalPages;

  const prevBtnContent = <Feather name="arrow-left" color="#fff" />;
  const nextBtnContent = <Feather name="arrow-right" color="#fff" />;

  return (
    <View className="w-full flex flex-row justify-center pb-4">
      <TouchablePaginationButton
        content={prevBtnContent}
        isActive={isPrevBtnActive}
        onClick={onClickPrev}
        isNavigator
      />
      <PaginationPageButtons
        currentPage={currentPage}
        paginationPageNumbers={paginationPageNumbers}
        onClickPageButton={onClickPageButton}
      />
      <TouchablePaginationButton
        content={nextBtnContent}
        isActive={isNextBtnActive}
        onClick={onClickNext}
        isNavigator
      />
    </View>
  );
};
