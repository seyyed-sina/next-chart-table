import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { MainLayout } from '@/components/layout/MainLayout';
import './globals.css';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next App Chart - Table demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
