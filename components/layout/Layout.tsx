import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { ChelseaLogo } from '../common/ChelseaLogo';
import BurgurIcon from '@heroicons/react/24/outline/Bars3Icon';
import Link from 'next/link';
import { useBreakpoint } from '../../utils/hooks';
import { chelseaColor } from '../../utils/common/variables';
import NavbarProfileLogin from './components/NavbarProfile';
import MobileNavbarDropdown from './components/MobileNavbarDropdown';

export enum PageName {
  HOME = '첼시특별시',
  PLAYERS = 'PLAYERS',
  REGISTER = 'REGISTER',
}
interface Page {
  id: number;
  link: string;
  name: PageName;
}

export const pages: Page[] = [
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
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    if (!isMobile) setIsDropdownOpened(false);
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
                    onClick={() => setIsDropdownOpened((prev) => !prev)}
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
          <NavbarProfileLogin />
        </div>
        {isMobile && isDropdownOpened && (
          <MobileNavbarDropdown
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setIsDropdownOpened={setIsDropdownOpened}
          />
        )}
      </nav>
      <main className="max-w-1024 pt-10px">{children}</main>
    </>
  );
};

export default Layout;
