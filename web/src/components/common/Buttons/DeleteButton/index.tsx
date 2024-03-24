'use client';

import { FC } from 'react';

type Props = {
  text?: string;
  onClick: () => Promise<void> | void;
  onMouseOver?: () => Promise<void> | void;
};

export const DeleteButton: FC<Props> = ({ text, onClick, onMouseOver }) => {
  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      className="text-center text-xs border border-red-500 w-full rounded-xl text-red-400 p-2 transition-all hover:bg-red-500 hover:text-white sm:text-sm md:text-base"
    >
      {text ?? 'Delete'}
    </button>
  );
};
