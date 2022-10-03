import Link from 'next/link';
import React from 'react';
import { ChelseaLogo } from '../../components/common/ChelseaLogo';
import SpaceY from '../../components/common/SpaceY';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

const LoginPage = () => {
  return (
    <div className="relative h-screen bg-gray-0">
      <div className="bottom-shadow absolute inset-x-0 top-0 bg-white py-8px px-16px">
        <div className="mx-auto flex h-full max-w-md items-center">
          <button className="p-4px">
            <ArrowLeftIcon className="h-24px w-24px" />
          </button>
          <h1
            className="absolute top-1/2 left-1/2 text-18px font-bold text-gray-700"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            LOGIN
          </h1>
        </div>
      </div>
      <div className="flex-center mx-auto h-full max-w-md flex-col px-32px">
        <ChelseaLogo className="h-160px w-160px" />
        <SpaceY height="20px" />
        <h1 className="text-20px font-bold text-chelsea">Welcome to 첼시특별시</h1>
        <SpaceY height="32px" />
        <input
          type="email"
          className="w-full rounded-sm border border-gray-400 px-12px py-6px outline-none focus:border-chelsea"
        />
        <SpaceY height="16px" />
        <input
          type="password"
          className="w-full rounded-sm border border-gray-400 px-12px py-6px outline-none focus:border-chelsea"
        />
        <SpaceY height="16px" />
        <button className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white">
          로그인
        </button>
        <SpaceY height="16px" />
        <Link href="/signup">
          <a className="text-center text-gray-800 underline">
            아직 계정이 없나요?
            <br />
            첼시특별시민이 되어 보세요!
          </a>
        </Link>
      </div>
    </div>
  );
};

// LoginPage.getLayout = function (page: React.ReactNode) {
//   return <Layout>{page}</Layout>;
// };

export default LoginPage;
