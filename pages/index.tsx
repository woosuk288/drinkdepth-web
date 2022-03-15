import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/Layout';
import SectionA from '../src/intro/SectionA';
import Meta from '../src/Meta';
import SectionB from '../src/intro/SectionB';
import SectionC from '../src/intro/SectionC';

const Home: NextPage = () => {
  const metaData = {
    title: '깊이를 마시다',
    description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
    image: '/images/logo_name.png',
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <SectionA />
      <SectionB />
      <SectionC />

      <div style={{ marginBottom: '100px' }}></div>
    </Layout>
  );
};

export default Home;
