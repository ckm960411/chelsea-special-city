import { omit } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { signUp } from '../../api/user';
import { ChelseaLogo } from '../../components/common/ChelseaLogo';
import InputField from '../../components/common/InputField';
import SpaceY from '../../components/common/SpaceY';
import SubLayout from '../../components/layout/SubLayout';
import { meState, tokenState } from '../../store';
import { EmailRegex } from '../../utils/common/regex-utils';
import { useBreakpoint } from '../../utils/hooks';

enum SignupErrorType {
  NAME_LENGTH,
  EMPTY_EMAIL,
  INCORRECT_EMAIL_FORMAT,
  EMPTY_PASSWORD,
  PASSWORD_LENGTH,
  EMPTY_CONFIRM_PASSWORD,
  CONFIRM_PASSWORD_LENGTH,
  INCORRECT_PASSWORD,
}
interface SignupError {
  type: SignupErrorType;
  message: string;
}
interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const router = useRouter();
  const isMobile = useBreakpoint();

  const me = useRecoilValue(meState);
  const token = useRecoilValue(tokenState);

  const [signupForm, setSignupForm] = useState<SignupForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState<SignupError | null>(null);

  const { username, email, password, confirmPassword } = signupForm;
  const {
    NAME_LENGTH,
    EMPTY_EMAIL,
    INCORRECT_EMAIL_FORMAT,
    EMPTY_PASSWORD,
    PASSWORD_LENGTH,
    EMPTY_CONFIRM_PASSWORD,
    CONFIRM_PASSWORD_LENGTH,
    INCORRECT_PASSWORD,
  } = SignupErrorType;

  const onValidate = () => {
    if (username.length < 2) {
      return setErrorMessage({
        type: NAME_LENGTH,
        message: '이름을 2자 이상 입력해주세요!',
      });
    } else if (email.length === 0) {
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
    } else if (confirmPassword.length === 0) {
      return setErrorMessage({
        type: EMPTY_CONFIRM_PASSWORD,
        message: '비밀번호를 입력해주세요!',
      });
    } else if (confirmPassword.length < 6) {
      return setErrorMessage({
        type: CONFIRM_PASSWORD_LENGTH,
        message: '비밀번호를 6자 이상 입력해주세요!',
      });
    } else if (password !== confirmPassword) {
      return setErrorMessage({
        type: INCORRECT_PASSWORD,
        message: '비밀번호가 일치하지 않습니다!',
      });
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async () => {
    if (onValidate() === undefined) return;
    try {
      await signUp(omit(signupForm, 'confirmPassword'));
      alert('회원가입에 성공했습니다. 로그인 페이지로 이동합니다.');
      router.push('/auth/login');
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (me && token) router.push('/');
  }, [me, token, router]);

  return (
    <div className="w-full px-32px text-center">
      <SpaceY height={isMobile ? '80px' : '120px'} />
      <ChelseaLogo className="mx-auto h-120px w-120px sm:h-160px sm:w-160px" />
      <SpaceY height="20px" />
      <h1 className="text-20px font-bold text-chelsea">Join Us</h1>
      <SpaceY height="24px" />
      <InputField
        label="Name"
        value={username}
        onChange={(e) => {
          setSignupForm((prev) => ({
            ...prev,
            username: e.target.value,
          }));
        }}
        errorSign={{
          isOpen: errorMessage?.type === NAME_LENGTH && username.length < 2,
          message: errorMessage?.message ?? '',
        }}
      />
      <SpaceY height="8px" />
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setSignupForm((prev) => ({
            ...prev,
            email: e.target.value,
          }));
        }}
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
        onChange={(e) => {
          setSignupForm((prev) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
        errorSign={{
          isOpen:
            (errorMessage?.type === EMPTY_PASSWORD || errorMessage?.type === PASSWORD_LENGTH) &&
            password.length < 6,
          message: errorMessage?.message ?? '',
        }}
      />
      <SpaceY height="8px" />
      <InputField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setSignupForm((prev) => ({
            ...prev,
            confirmPassword: e.target.value,
          }));
        }}
        errorSign={{
          isOpen:
            ((errorMessage?.type === EMPTY_CONFIRM_PASSWORD ||
              errorMessage?.type === CONFIRM_PASSWORD_LENGTH) &&
              confirmPassword.length < 6) ||
            (errorMessage?.type === INCORRECT_PASSWORD && password !== confirmPassword),
          message: errorMessage?.message ?? '',
        }}
      />
      <SpaceY height="24px" />
      <button
        onClick={handleSubmit}
        className="w-full rounded-sm bg-chelsea py-12px text-18px font-bold text-white"
      >
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
