import React from 'react';
import Layout from '../../components/layout/Layout';

const PlayerDetailPage = () => {
  return <div>PlayerDetailPage</div>;
};

export default PlayerDetailPage;

PlayerDetailPage.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
