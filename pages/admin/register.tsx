import React from 'react';
import Layout from '../../components/layout/Layout';

const RegisterPlayerPage = () => {
  return <div className="px-16px">PLAYERS</div>;
};

export default RegisterPlayerPage;

RegisterPlayerPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
