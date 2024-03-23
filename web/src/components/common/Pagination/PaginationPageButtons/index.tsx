'use client';

import { FC } from 'react';

import { Button } from '../../Button';

type Props = {
  currentPage: number;
  paginationPageNumbers: number[];
  onGoToPage: (page: number) => Promise<void>;
  onPrefetch?: (page: number) => Promise<void>
};

export const PaginationPageButtons: FC<Props> = ({
  currentPage,
  paginationPageNumbers,
  onGoToPage,
  onPrefetch
}): JSX.Element => {
  return (
    <div className="flex gap-3">
      {paginationPageNumbers.map((page) => {
        const isActive = currentPage === page;
        const onClick = async (): Promise<void> => await onGoToPage(page);
        const onPagePrefetch = async (): Promise<void> => {
          if (onPrefetch) {
            await onPrefetch(page)
          }
        }

        return (
          <Button
            key={page}
            content={page}
            isActive={isActive}
            onClick={onClick}
            styles="w-10 h-10 px-2 text-xs md:w-12 md:h-12 md:text-base"
            onMouseOver={onPagePrefetch}
          />
        );
      })}
    </div>
  );
};
