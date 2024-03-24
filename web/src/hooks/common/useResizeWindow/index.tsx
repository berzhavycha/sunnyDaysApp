'use client';

import { useEffect } from 'react';

import { IS_CLIENT } from '@/shared';

export const useResizeWindow = (onResize: () => void): void => {
  useEffect(() => {
    if (IS_CLIENT) {
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, []);
};
