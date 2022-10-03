import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getMe } from '../../api/user';
import { meState, tokenState } from '../../store';

const MeProvider = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useRecoilState(meState);
  const [token, setToken] = useRecoilState(tokenState);

  const _setMe = async () => {
    const result = await getMe().catch(() => {
      setToken(null);
    });
    if (result && result.status === 200 && result?.data) {
      setMe(result.data.data);
    } else {
      setToken(null);
    }
  };

  useEffect(() => {
    if (token && !me) {
      _setMe();
    } else if (!token && me) {
      setMe(undefined);
    }
  }, [token, me, setMe]);

  return <>{children}</>;
};

export default MeProvider;
