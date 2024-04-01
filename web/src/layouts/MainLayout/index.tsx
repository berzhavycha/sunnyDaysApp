import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Inter } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { Providers } from '@/context';

import { ProtectedLayout } from '../ProtectedLayout';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProtectedLayout>{children}</ProtectedLayout>
        </Providers>
      </body>
    </html>
  );
};
