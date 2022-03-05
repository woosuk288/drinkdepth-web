import * as React from 'react';
import type { NextPage } from 'next';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Layout from '../src/Layout';
import SectionA from '../src/intro/SectionA';

const Home: NextPage = () => {
  return (
    <Layout>
      <SectionA />

      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
    </Layout>
  );
};

export default Home;
