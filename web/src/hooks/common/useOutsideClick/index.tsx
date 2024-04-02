'use client';

import { RefObject, useEffect } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLDivElement>, handler: () => void): void => {
  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [ref, handler]);
};
