'use client';

import { useEffect } from 'react';

export const useResizeWindow = (onResize: () => void): void => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, []);
};
