import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { meState, tokenState } from '../../store';
import { UserStatus } from '../../utils/type/user';
import { RegisterForm } from '../../utils/type/player';
import SpaceY from '../../components/common/SpaceY';
import Layout from '../../components/layout/Layout';
import PlayerPositionField from '../../components/register/PlayerPositionField';
import PlayerDetailPositoinField from '../../components/register/PlayerDetailPositoinField';
import PlayerPhotoField from '../../components/register/PlayerPhotoField';
import PlayerNameField from '../../components/register/PlayerNameField';
import PlayerBackNumberField from '../../components/register/PlayerBackNumberField';
import PlayerNationalTeamField from '../../components/register/PlayerNationalTeamField';
import PlayerBirthPlaceField from '../../components/register/PlayerBirthPlaceField';
import PlayerBirthDateField from '../../components/register/PlayerBirthDateField';
import PlayerHeightField from '../../components/register/PlayerHeightField';
import { registerPlayer } from '../../api/players';
import PlayerSearch from '../../components/player/PlayerSearch';

const initialRegisterForm = {
  profileImg: '',
  name: '',
  backNumber: null,
  position: null,
  detailPosition: [],
  nationalTeam: '',
  birthPlace: '',
  birthDate: '',
  height: 0,
};

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialRegisterForm);

  const handleSubmit = async () => {
    const { backNumber, position, ...rest } = registerForm;
    if (backNumber && position) {
      await registerPlayer({
        backNumber,
        position,
        ...rest,
      })
        .then(() => {
          alert('선수 등록이 완료됐습니다!');
          setRegisterForm(initialRegisterForm);
        })
        .catch(() => alert('문제가 발생했습니다. 다시 시도해 주세요.'));
    } else {
      alert('빠진 입력란이 없는지 확인해주세요!');
    }
  };

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
        <PlayerSearch setRegisterForm={setRegisterForm} />
        <PlayerPhotoField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerNameField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerBackNumberField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerPositionField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerDetailPositoinField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerNationalTeamField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerBirthPlaceField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerBirthDateField registerForm={registerForm} setRegisterForm={setRegisterForm} />
        <PlayerHeightField registerForm={registerForm} setRegisterForm={setRegisterForm} />
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
