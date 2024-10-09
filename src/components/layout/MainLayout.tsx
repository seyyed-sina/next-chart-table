'use client';
import { PropsWithChildren } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { clx } from '@/utils/helper';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = ({ children }: MainLayoutProps) => {
  const currentPath = usePathname();

  const menuClassName =
    'flex items-center justify-center text-center py-2 text-white';
  const activeMenuClassName =
    'text-primary-400 font-bold border-b-2 border-solid border-b-primary-400';

  return (
    <main className="flex flex-col bg-primary-900 min-h-dvh">
      <header className="container mx-auto py-6 px-8 text-center flex items-center justify-center gap-6  text-primary-100">
        <Link
          href="/"
          className={clx(
            menuClassName,
            currentPath === '/' && activeMenuClassName,
          )}>
          Chart
        </Link>
        <Link
          href="/table"
          className={clx(
            menuClassName,
            currentPath === '/table' && activeMenuClassName,
          )}>
          Table
        </Link>
      </header>
      <div className="py-8">{children}</div>
    </main>
  );
};

MainLayout.displayName = 'MainLayout';
