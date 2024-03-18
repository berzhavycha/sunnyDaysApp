'use client'

import { FC } from 'react';

import { Button } from '../../Button';

type Props = {
  currentPage: number;
  paginationPageNumbers: number[];
  onGoToPage: (page: number) => Promise<void>;
};

export const PaginationPageButtons: FC<Props> = ({
  currentPage,
  paginationPageNumbers,
  onGoToPage,
}): JSX.Element => {
  return (
    <div className="flex gap-3">
      {paginationPageNumbers.map((page) => {
        const isActive = currentPage === page;
        const onClick = async (): Promise<void> => await onGoToPage(page);

        return (
          <Button key={page} content={page} isActive={isActive} onClick={onClick} styles="w-12" />
        );
      })}
    </div>
  );
};
