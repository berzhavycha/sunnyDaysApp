import { MainLayout } from '@/layouts';

import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <MainLayout>{children}</MainLayout>;
}
