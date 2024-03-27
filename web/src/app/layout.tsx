import type { Metadata } from 'next';
import { MainLayout } from '@/layouts';
import './globals.css';
import { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Sunny Days',
  description: 'Sunny Days App',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default RootLayout;
