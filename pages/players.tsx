import React from 'react';
import Layout from '../components/layout/Layout';

const Players = () => {
  return <div>PLAYERS</div>;
};

export default Players;

Players.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
