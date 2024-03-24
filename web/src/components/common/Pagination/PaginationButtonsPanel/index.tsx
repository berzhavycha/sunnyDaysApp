import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { PaginationQueryOptionsState } from '@/shared';
import { OnPrefetch,  usePaginationPrefetch } from '@/hooks';
import { PaginationPageButtons } from '../PaginationPageButtons';
import { Button } from '../../Buttons';

type Props = {
  paginationOptions: PaginationQueryOptionsState,
  startPageNumber: number;
  currentPage: number;
  paginationPageNumbers: number[];
  totalPages: number;
  onGoToPage: (page: number) => Promise<void>;
  onClickNext: () => Promise<void>;
  onClickPrev: () => Promise<void>;
  onPrefetch?: OnPrefetch
};

export const PaginationButtonsPanel: FC<Props> = ({
  paginationOptions,
  startPageNumber,
  currentPage,
  paginationPageNumbers,
  totalPages,
  onGoToPage,
  onClickNext,
  onClickPrev,
  onPrefetch
}): JSX.Element => {
  const { onPrevPrefetch, onNextPrefetch, onGoToPagePrefetch } = usePaginationPrefetch({
    paginationOptions,
    startPageNumber,
    currentPage,
    totalPages,
    onPrefetch
  })

  const isPrevBtnActive = currentPage !== startPageNumber;
  const isNextBtnActive = currentPage < totalPages;

  const prevBtnContent = <FontAwesomeIcon icon={faArrowLeft} />;
  const nextBtnContent = <FontAwesomeIcon icon={faArrowRight} />;

  return (
    <div className="w-full flex flex-row justify-center pb-4 gap-3">
      <Button
        content={prevBtnContent}
        onClick={onClickPrev}
        isDisabled={!isPrevBtnActive}
        styles="w-10 h-10 px-2 text-xs md:w-12 md:h-12 md:text-base"
        onMouseOver={onPrevPrefetch}
      />
      <PaginationPageButtons
        currentPage={currentPage}
        paginationPageNumbers={paginationPageNumbers}
        onGoToPage={onGoToPage}
        onPrefetch={onGoToPagePrefetch}
      />
      <Button
        content={nextBtnContent}
        onClick={onClickNext}
        isDisabled={!isNextBtnActive}
        styles="w-10 h-10 px-2 text-xs md:w-12 md:h-12 md:text-base"
        onMouseOver={onNextPrefetch}
      />
    </div>
  );
};
