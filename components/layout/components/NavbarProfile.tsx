import { useState } from 'react';
import { useBreakpoint } from '../../../utils/hooks';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import UserIcon from '@heroicons/react/24/outline/UserCircleIcon';

const NavbarProfileLogin = () => {
  const isMobile = useBreakpoint();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isMobile ? (
        <button className="p-4px text-gray-600 hover:text-chelsea">
          <UserIcon className="h-24px w-24px" />
        </button>
      ) : (
        <>
          {isLoggedIn ? (
            <div className="flex items-center gap-8px pr-4px">
              <button className="p-4px text-gray-600 hover:text-chelsea">
                <BellIcon className="h-24px w-24px flex-shrink-0" />
              </button>
              <div className="h-40px w-40px flex-shrink-0 cursor-pointer rounded-full border-2 border-yellow-300 bg-gray-200"></div>
            </div>
          ) : (
            <button className="pr-4px text-18px font-semibold text-gray-600 hover:text-chelsea">
              LOGIN
            </button>
          )}
        </>
      )}
    </>
  );
};

export default NavbarProfileLogin;
