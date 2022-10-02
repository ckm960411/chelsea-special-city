import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { ChelseaLogo } from '../common/ChelseaLogo';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import BurgurIcon from '@heroicons/react/24/outline/Bars3Icon';
import Link from 'next/link';
import { useBreakpoint } from '../../utils/hooks';
import { chelseaColor } from '../../utils/common/variables';

enum PageName {
  HOME = '첼시특별시',
  PLAYERS = 'PLAYERS',
  REGISTER = 'REGISTER',
}
interface Page {
  id: number;
  link: string;
  name: PageName;
}

const pages: Page[] = [
  {
    id: 0,
    link: '/',
    name: PageName.HOME,
  },
  {
    id: 1,
    link: '/players',
    name: PageName.PLAYERS,
  },
  {
    id: 999,
    link: '/admin/register',
    name: PageName.REGISTER,
  },
];

export const NAVBAR_HEIGHT = 64;

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useBreakpoint();

  const [currentPage, setCurrentPage] = useState<PageName>(PageName.HOME);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  useEffect(() => {
    if (!isMobile) setIsDrawerOpened(false);
  }, [isMobile]);

  return (
    <>
      <nav className="bottom-shadow relative" style={{ height: NAVBAR_HEIGHT, zIndex: 1000 }}>
        <div className="max-w-1024 relative flex h-full items-center justify-between px-12px">
          <div className="flex h-full items-center gap-16px">
            {isMobile ? (
              <>
                <button className="p-4px">
                  <BurgurIcon
                    onClick={() => setIsDrawerOpened((prev) => !prev)}
                    className="h-24px w-24px flex-shrink-0 text-gray-600 hover:text-chelsea"
                  />
                </button>
                <Link href="/">
                  <a>
                    <ChelseaLogo
                      onClick={() => setCurrentPage(PageName.HOME)}
                      className="absolute top-1/2 left-1/2 h-48px w-48px cursor-pointer"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    />
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/">
                  <a>
                    <ChelseaLogo
                      onClick={() => setCurrentPage(PageName.HOME)}
                      className="h-48px w-48px cursor-pointer"
                    />
                  </a>
                </Link>
                {pages.map((page) => {
                  const isCurrent = page.name === currentPage;
                  return (
                    <Link key={page.id} href={page.link}>
                      <a
                        onClick={() => setCurrentPage(page.name)}
                        className={`flex h-full items-center text-18px font-semibold duration-200 ${
                          isCurrent ? 'text-chelsea' : 'text-gray-600'
                        }`}
                        style={{
                          borderTop: '3px solid transparent',
                          borderBottom: isCurrent
                            ? `3px solid ${chelseaColor}`
                            : '3px solid transparent',
                        }}
                      >
                        {page.name}
                      </a>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
          <div className="flex items-center gap-8px pr-4px">
            <button className="p-4px">
              <BellIcon className="h-24px w-24px flex-shrink-0 text-gray-600 hover:text-chelsea" />
            </button>
            <div className="h-40px w-40px flex-shrink-0 cursor-pointer rounded-full border-2 border-yellow-300 bg-gray-200"></div>
          </div>
        </div>
        {isMobile && isDrawerOpened && (
          <div
            className="absolute inset-x-0 top-full flex flex-col"
            style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
          >
            <div className="bottom-shadow flex-shrink-0 bg-white">
              <hr />
              <ul className="p-16px">
                {pages.map((page) => {
                  const isCurrent = page.name === currentPage;
                  return (
                    <li
                      key={page.id}
                      onClick={() => {
                        setCurrentPage(page.name);
                        setIsDrawerOpened(false);
                      }}
                      className={`cursor-pointer py-6px px-4px ${
                        isCurrent ? 'text-chelsea' : 'text-gray-600'
                      }`}
                    >
                      <Link href={page.link}>
                        <a>{page.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              onClick={() => setIsDrawerOpened(false)}
              className="h-full flex-grow bg-littleblack"
            ></div>
          </div>
        )}
      </nav>
      <main className="max-w-1024 pt-10px">{children}</main>
    </>
  );
};

export default Layout;
