import type { Metadata } from 'next';

import { MainLayout } from '@/components/layout/MainLayout';
import { inter } from '@/constants/font';
import './globals.css';

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
