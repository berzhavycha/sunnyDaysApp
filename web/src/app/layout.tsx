import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import { Providers } from '@/context';

import './globals.css';
import { ProtectedLayout } from '@/layouts';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sunny Days',
  description: 'Sunny Days App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedLayout>
          <Providers>{children}</Providers>
        </ProtectedLayout>
      </body>
    </html>
  );
}
