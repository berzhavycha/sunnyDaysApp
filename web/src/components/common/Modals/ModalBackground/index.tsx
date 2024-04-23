'use client';

import React, { FC, PropsWithChildren, useRef } from 'react';

import { useOutsideClick } from '@/hooks';

import { CloseButton } from '../../Buttons';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  zIndex?: number;
}>;

export const ModalBackground: FC<Props> = ({ isVisible, onClose, zIndex, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-${zIndex ?? 10}`}
        >
          <div className="text-right p-4">
            <CloseButton onClick={onClose} />
          </div>
        </div>
      )}
      <div ref={modalRef}>{children}</div>
    </>
  );
};
