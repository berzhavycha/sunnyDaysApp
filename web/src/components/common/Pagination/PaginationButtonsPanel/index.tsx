import { FC } from 'react';

import { PaginationPageButtons } from '../PaginationPageButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../Button';

type Props = {
  startPageNumber: number;
  currentPage: number;
  paginationPageNumbers: number[];
  totalPages: number;
  onClickPageButton: (page: number) => Promise<void>;
  onClickNext: () => Promise<void>;
  onClickPrev: () => Promise<void>;
};

export const PaginationButtonsPanel: FC<Props> = ({
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

  const prevBtnContent = <FontAwesomeIcon icon={faArrowLeft} />;
  const nextBtnContent = <FontAwesomeIcon icon={faArrowRight} />;

  return (
    <div className="w-full flex flex-row justify-center pb-4">
      <Button content={prevBtnContent} onClick={onClickPrev} isDisabled={!isPrevBtnActive} />
      <PaginationPageButtons
        currentPage={currentPage}
        paginationPageNumbers={paginationPageNumbers}
        onClickPageButton={onClickPageButton}
      />
      <Button content={nextBtnContent} onClick={onClickNext} isDisabled={!isNextBtnActive} />
    </div>
  );
};
