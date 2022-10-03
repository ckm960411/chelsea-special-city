import React from 'react';
import Link from 'next/link';

import { ChelseaLogo } from '../../components/common/ChelseaLogo';
import SpaceY from '../../components/common/SpaceY';
import SubLayout from '../../components/layout/SubLayout';
import InputField from '../../components/common/InputField';
import { useBreakpoint } from '../../utils/hooks';

const LoginPage = () => {
  const isMobile = useBreakpoint();

  return (
    <div className="w-full px-32px text-center">
      <SpaceY height={isMobile ? '80px' : '160px'} />
      <ChelseaLogo className="mx-auto h-120px w-120px sm:h-160px sm:w-160px" />
      <SpaceY height="20px" />
      <h1 className="text-20px font-bold text-chelsea">Welcome to 첼시특별시</h1>
      <SpaceY height="24px" />
      <InputField label="Email" type="email" />
      <SpaceY height="8px" />
      <InputField label="Password" type="password" />
      <SpaceY height="24px" />
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
      <SpaceY height={isMobile ? '120px' : '80px'} />
    </div>
  );
};

LoginPage.getLayout = function (page: React.ReactNode) {
  return <SubLayout title="LOGIN">{page}</SubLayout>;
};

export default LoginPage;
