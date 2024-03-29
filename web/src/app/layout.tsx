import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

import { MainLayout } from '@/layouts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Sunny Days',
  description: 'Sunny Days App',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default RootLayout;
