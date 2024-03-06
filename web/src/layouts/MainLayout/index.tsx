import { FC, PropsWithChildren } from 'react';
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

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <ProtectedLayout>
                        {children}
                    </ProtectedLayout>
                </Providers>
            </body>
        </html>
    );
}
