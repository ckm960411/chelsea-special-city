import React from 'react';
import SubLayout from '../../components/layout/SubLayout';

const SignupPage = () => {
  return <div className="w-full px-32px text-center"></div>;
};

SignupPage.getLayout = function (page: React.ReactNode) {
  return <SubLayout title="SIGN UP">{page}</SubLayout>;
};

export default SignupPage;
