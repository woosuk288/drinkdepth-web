import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
import { limit } from 'firebase/firestore';
// import PostList from '../../src/blog/PostList';
import { Coffee } from '../../src/types';
import Meta from '../../src/Meta';
import { getCoffees } from '../../firebase/query';
import CoffeeList from '../../src/coffee/CoffeeList';
import CoffeeFilter from '../../src/coffee/CoffeeFilter';

export type CoffeeProps = {
  coffees: Coffee[];
};

const Coffee: NextPage<CoffeeProps> = ({ coffees }) => {
  console.log('coffees : ', coffees);

  const metaData = {
    title: '깊이를 마시다. 어떤 음료를 찾으시나요?',
    description: '필요한 음료를 쉽게 찾아보세요.',
    image: '/images/logo_icon.png',
    canonical: 'coffee',
    type: 'blog',
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <CoffeeFilter items={coffees} />
      <CoffeeList coffees={coffees} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const coffees = await getCoffees(limit(15));

  return {
    props: {
      coffees,
    },
    // revalidate: 60
  };
};

export default Coffee;
