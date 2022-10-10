import React from 'react';
import Layout from '../components/layout/Layout';

const Home = () => {
  return <div className="px-16px">HOME</div>;
};

Home.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
