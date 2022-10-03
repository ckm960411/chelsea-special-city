import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { NAVBAR_HEIGHT, Page, PageName } from '../Layout';

interface MobileNavbarDropdownProps {
  navigations: Page[];
  currentPage: PageName | undefined;
  setCurrentPage: Dispatch<SetStateAction<PageName | undefined>>;
  setIsDropdownOpened: Dispatch<SetStateAction<boolean>>;
}
const MobileNavbarDropdown = ({
  navigations,
  currentPage,
  setCurrentPage,
  setIsDropdownOpened,
}: MobileNavbarDropdownProps) => {
  return (
    <div
      className="absolute inset-x-0 top-full flex flex-col"
      style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
    >
      <div className="bottom-shadow flex-shrink-0 bg-white">
        <hr />
        <ul className="p-16px">
          {navigations.map((page) => {
            const isCurrent = page.name === currentPage;
            return (
              <li
                key={page.id}
                onClick={() => {
                  setCurrentPage(page.name);
                  setIsDropdownOpened(false);
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
        onClick={() => setIsDropdownOpened(false)}
        className="h-full flex-grow bg-littleblack"
      ></div>
    </div>
  );
};

export default MobileNavbarDropdown;
