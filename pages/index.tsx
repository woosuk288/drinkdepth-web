import * as React from 'react';
import type { NextPage } from 'next';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Layout from '../src/Layout';
import SectionA from '../src/intro/SectionA';
import Meta from '../src/Meta';

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

      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
    </Layout>
  );
};

export default Home;
