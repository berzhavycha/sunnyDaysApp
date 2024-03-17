import type { Metadata } from 'next';

import { MainLayout } from '@/layouts';

import './globals.css';


export const metadata: Metadata = {
  title: 'Sunny Days',
  description: 'Sunny Days App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <MainLayout>{children}</MainLayout>;
}
