import { useState } from 'react';
import { useBreakpoint } from '../../../utils/hooks';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import UserIcon from '@heroicons/react/24/outline/UserCircleIcon';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavbarProfileLogin = () => {
  const isMobile = useBreakpoint();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isMobile ? (
        <button
          onClick={() => {
            if (isLoggedIn) return; // router.push('/profile');
            else router.push('/auth/login');
          }}
          className="p-4px text-gray-600 hover:text-chelsea"
        >
          <UserIcon className="h-24px w-24px" />
        </button>
      ) : (
        <>
          {isLoggedIn ? (
            <div className="flex items-center gap-8px pr-4px">
              <button className="p-4px text-gray-600 hover:text-chelsea">
                <Link href="/profile">
                  <a>
                    <BellIcon className="h-24px w-24px flex-shrink-0" />
                  </a>
                </Link>
              </button>
              <div className="h-40px w-40px flex-shrink-0 cursor-pointer rounded-full border-2 border-yellow-300 bg-gray-200"></div>
            </div>
          ) : (
            <button className="pr-4px text-18px font-semibold text-gray-600 hover:text-chelsea">
              <Link href="/auth/login">
                <a>LOGIN</a>
              </Link>
            </button>
          )}
        </>
      )}
    </>
  );
};

export default NavbarProfileLogin;
