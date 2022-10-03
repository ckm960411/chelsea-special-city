import Link from 'next/link';
import React from 'react';
import { ChelseaLogo } from '../../components/common/ChelseaLogo';
import InputField from '../../components/common/InputField';
import SpaceY from '../../components/common/SpaceY';
import SubLayout from '../../components/layout/SubLayout';
import { useBreakpoint } from '../../utils/hooks';

const SignupPage = () => {
  const isMobile = useBreakpoint();

  return (
    <div className="w-full px-32px text-center">
      <SpaceY height={isMobile ? '80px' : '120px'} />
      <ChelseaLogo className="mx-auto h-120px w-120px sm:h-160px sm:w-160px" />
      <SpaceY height="20px" />
      <h1 className="text-20px font-bold text-chelsea">Join Us</h1>
      <SpaceY height="24px" />
      <InputField label="Name" />
      <SpaceY height="8px" />
      <InputField label="Email" type="email" />
      <SpaceY height="8px" />
      <InputField label="Password" type="password" />
      <SpaceY height="8px" />
      <InputField label="Confirm Password" type="password" />
      <SpaceY height="24px" />
      <button className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white">
        회원가입
      </button>
      <SpaceY height="16px" />
      <Link href="/auth/login">
        <a className="text-center text-gray-800 underline">
          이미 첼시특별시민이예요
          <br />
          로그인하러 갈래요!
        </a>
      </Link>
      <SpaceY height={isMobile ? '120px' : '80px'} />
    </div>
  );
};

SignupPage.getLayout = function (page: React.ReactNode) {
  return <SubLayout title="SIGN UP">{page}</SubLayout>;
};

export default SignupPage;
