import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

import { Button } from '../../Buttons';
import { PaginationPageButtons } from '../PaginationPageButtons';

type Props = {
  startPageNumber: number;
  currentPage: number;
  paginationPageNumbers: number[];
  totalPages: number;
  onGoToPage: (page: number) => Promise<void>;
  onClickNext: () => Promise<void>;
  onClickPrev: () => Promise<void>;
  onPrevPrefetch?: () => Promise<void>;
  onNextPrefetch?: () => Promise<void>;
  onGoToPagePrefetch?: (page: number) => Promise<void>;
};

export const PaginationButtonsPanel: FC<Props> = ({
  startPageNumber,
  currentPage,
  paginationPageNumbers,
  totalPages,
  onGoToPage,
  onClickNext,
  onClickPrev,
  onNextPrefetch,
  onPrevPrefetch,
  onGoToPagePrefetch,
}): JSX.Element => {
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
        className="w-10 h-10 px-2 text-xs md:w-12 md:h-12 md:text-base"
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
        className="w-10 h-10 px-2 text-xs md:w-12 md:h-12 md:text-base"
        onMouseOver={onNextPrefetch}
      />
    </div>
  );
};
