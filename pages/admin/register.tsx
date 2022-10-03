import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Layout from '../../components/layout/Layout';
import { meState, tokenState } from '../../store';
import { UserStatus } from '../../utils/type/user';

const RegisterPlayerPage = () => {
  const router = useRouter();
  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else if (me) {
      if (me.userStatus !== UserStatus.ADMIN) router.push('/');
    }
  }, [me, router, token]);

  return <div className="px-16px">PLAYERS</div>;
};

export default RegisterPlayerPage;

RegisterPlayerPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
