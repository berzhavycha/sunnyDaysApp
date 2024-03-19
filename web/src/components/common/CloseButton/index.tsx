'use client';

import React, { FC } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  styles?: string;
  onClick: () => void;
};

export const CloseButton: FC<Props> = ({ styles, onClick }) => {
  const defaultStyles =
    'rounded-full bg-red-500 text-white hover:bg-red-600 transition-all p-2 px-4';

  return (
    <button className={`${defaultStyles} ${styles}`} onClick={onClick}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};
