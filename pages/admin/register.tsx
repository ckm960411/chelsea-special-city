import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { meState, tokenState } from '../../store';
import { UserStatus } from '../../utils/type/user';
import { RegisterForm } from '../../utils/type/player';
import InputField from '../../components/common/InputField';
import SpaceY from '../../components/common/SpaceY';
import Layout from '../../components/layout/Layout';
import SelectPositionField from '../../components/register/SelectPositionField';
import ChooseDetailPositoinField from '../../components/register/ChooseDetailPositoinField';
import UploadPlayerPhotoField from '../../components/register/UploadPlayerPhotoField';

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    profileImg: '',
    name: '',
    backNumber: null,
    position: null,
    detailPosition: [],
    nationalTeam: '',
    birthPlace: '',
    birthDate: '',
    height: 0,
  });

  const handleSubmit = () => {};

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else if (me) {
      if (me.userStatus !== UserStatus.ADMIN) router.push('/');
    }
  }, [me, router, token]);

  return (
    <div className="mx-auto max-w-md px-16px">
      <SpaceY height="16px" />
      <div className="flex flex-col gap-16px">
        <UploadPlayerPhotoField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <InputField label="NAME" />
        <InputField label="BACKNUMBER" />
        <SelectPositionField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <ChooseDetailPositoinField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <InputField label="NATIONAL TEAM" />
        <InputField label="BIRTH PLACE" />
        <InputField label="BIRTH DATE" />
        <InputField label="HEIGHT" />
      </div>
      <SpaceY height="24px" />
      <button
        onClick={handleSubmit}
        className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white"
      >
        REGISTER
      </button>
      <SpaceY height="80px" />
    </div>
  );
};

export default RegisterPlayerPage;

RegisterPlayerPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
