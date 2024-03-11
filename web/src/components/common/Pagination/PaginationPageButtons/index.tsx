import { FC } from 'react';

import { Button } from '../../Button';

type Props = {
  currentPage: number;
  paginationPageNumbers: number[];
  onClickPageButton: (page: number) => Promise<void>;
};

export const PaginationPageButtons: FC<Props> = ({
  currentPage,
  paginationPageNumbers,
  onClickPageButton,
}): JSX.Element => {
  return (
    <div className="flex gap-3">
      {paginationPageNumbers.map((page) => {
        const isActive = currentPage === page;

        const onClick = async (): Promise<void> => await onClickPageButton(page);

        return <Button key={page} content={page} isActive={isActive} onClick={onClick} styles='w-12' />;
      })}
    </div>
  );
};
