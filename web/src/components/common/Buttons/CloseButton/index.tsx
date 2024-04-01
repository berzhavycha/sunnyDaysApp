'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

type Props = {
  className?: string;
  onClick: () => void;
};

export const CloseButton: FC<Props> = ({ className, onClick }) => {
  const defaultStyles =
    'rounded-full bg-red-500 text-white hover:bg-red-600 transition-all p-2 px-4';

  return (
    <button className={`${defaultStyles} ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};
