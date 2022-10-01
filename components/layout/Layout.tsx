import { NextPage } from 'next';
import React from 'react';
import { ChelseaLogo } from '../common/ChelseaLogo';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import BurgurIcon from '@heroicons/react/24/outline/Bars3Icon';
import Link from 'next/link';
import { useBreakpoint } from '../../utils/hooks';
import { chelseaColor } from '../../utils/common/variables';

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useBreakpoint();

  return (
    <>
      <nav className="bottom-shadow h-64px">
        <div className="max-w-1024 relative flex h-full items-center justify-between px-12px">
          <div className="flex h-full items-center gap-16px">
            {isMobile ? (
              <>
                <button className="p-4px">
                  <BurgurIcon className="h-24px w-24px flex-shrink-0 text-gray-600 sm:text-chelsea" />
                </button>
                <ChelseaLogo
                  className="absolute top-1/2 left-1/2 h-48px w-48px"
                  style={{ transform: 'translate(-50%, -50%)' }}
                />
              </>
            ) : (
              <>
                <div className="flex h-full items-center gap-16px pl-4px">
                  <ChelseaLogo className="h-48px w-48px" />
                  <Link href="/" className="h-full">
                    <a
                      className="flex h-full items-center text-18px font-semibold text-chelsea"
                      style={{ borderBottom: `2px solid ${chelseaColor}` }}>
                      첼시특별시
                    </a>
                  </Link>
                </div>
                <Link href="/players">
                  <a className="text-18px font-semibold text-gray-600">PLAYERS</a>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-8px pr-4px">
            <BellIcon className="h-24px w-24px flex-shrink-0 text-gray-600 sm:text-chelsea" />
            <div className="h-40px w-40px flex-shrink-0 rounded-full border-2 border-yellow-300 bg-gray-200"></div>
          </div>
        </div>
      </nav>
      <main className="max-w-1024 pt-10px">{children}</main>
    </>
  );
};

export default Layout;
