import React from 'react';
import Layout from '../../components/layout/Layout';

const LoginPage = () => {
  return <div className="px-16px">LoginPage</div>;
};

LoginPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
