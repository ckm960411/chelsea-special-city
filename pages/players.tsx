import React from 'react';
import Layout from '../components/layout/Layout';

const PlayersPage = () => {
  return <div className="px-16px">PLAYERS</div>;
};

export default PlayersPage;

PlayersPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
