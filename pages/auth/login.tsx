import React, { useState } from 'react';
import Link from 'next/link';

import { ChelseaLogo } from '../../components/common/ChelseaLogo';
import SpaceY from '../../components/common/SpaceY';
import SubLayout from '../../components/layout/SubLayout';
import InputField from '../../components/common/InputField';
import { useBreakpoint } from '../../utils/hooks';
import { EmailRegex } from '../../utils/common/regex-utils';
import { login } from '../../api/user';

enum LoginErrorType {
  EMPTY_EMAIL,
  INCORRECT_EMAIL_FORMAT,
  EMPTY_PASSWORD,
  PASSWORD_LENGTH,
}
interface LoginError {
  type: LoginErrorType;
  message: string;
}

const LoginPage = () => {
  const { EMPTY_EMAIL, INCORRECT_EMAIL_FORMAT, EMPTY_PASSWORD, PASSWORD_LENGTH } = LoginErrorType;
  const isMobile = useBreakpoint();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<LoginError | null>(null);

  const onValidate = () => {
    if (email.length === 0) {
      return setErrorMessage({
        type: EMPTY_EMAIL,
        message: '이메일을 입력해주세요!',
      });
    } else if (!EmailRegex.test(email)) {
      return setErrorMessage({
        type: INCORRECT_EMAIL_FORMAT,
        message: '이메일 형식이 맞지 않습니다!',
      });
    } else if (password.length === 0) {
      return setErrorMessage({
        type: EMPTY_PASSWORD,
        message: '비밀번호를 입력해주세요!',
      });
    } else if (password.length < 6) {
      return setErrorMessage({
        type: PASSWORD_LENGTH,
        message: '비밀번호를 6자 이상 입력해주세요!',
      });
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async () => {
    if (onValidate() === undefined) return;
    try {
      const response = await login({ email, password });
      const { data } = response.data;
      localStorage.setItem('token', data.token);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="w-full px-32px text-center">
      <SpaceY height={isMobile ? '80px' : '160px'} />
      <ChelseaLogo className="mx-auto h-120px w-120px sm:h-160px sm:w-160px" />
      <SpaceY height="20px" />
      <h1 className="text-20px font-bold text-chelsea">Welcome to 첼시특별시</h1>
      <SpaceY height="24px" />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        errorSign={{
          isOpen:
            (errorMessage?.type === EMPTY_EMAIL || errorMessage?.type === INCORRECT_EMAIL_FORMAT) &&
            !EmailRegex.test(email),
          message: errorMessage?.message ?? '',
        }}
      />
      <SpaceY height="8px" />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorSign={{
          isOpen:
            (errorMessage?.type === EMPTY_PASSWORD || errorMessage?.type === PASSWORD_LENGTH) &&
            password.length < 6,
          message: errorMessage?.message ?? '',
        }}
      />
      <SpaceY height="24px" />
      <button
        onClick={handleSubmit}
        className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white"
      >
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
