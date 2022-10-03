import Link from 'next/link';
import React from 'react';
import { ChelseaLogo } from '../../components/common/ChelseaLogo';
import SpaceY from '../../components/common/SpaceY';
import SubLayout from '../../components/layout/SubLayout';

const LoginPage = () => {
  return (
    <div className="w-full px-32px text-center">
      <ChelseaLogo className="mx-auto h-160px w-160px" />
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
      <Link href="/auth/signup">
        <a className="text-center text-gray-800 underline">
          아직 계정이 없나요?
          <br />
          첼시특별시민이 되어 보세요!
        </a>
      </Link>
    </div>
  );
};

LoginPage.getLayout = function (page: React.ReactNode) {
  return <SubLayout title="LOGIN">{page}</SubLayout>;
};

export default LoginPage;
