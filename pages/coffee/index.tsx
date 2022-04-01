import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
import { limit, orderBy } from 'firebase/firestore/lite';
// import PostList from '../../src/blog/PostList';
import { Coffee } from '../../src/types';
import Meta from '../../src/Meta';
import { apiCoffee } from '../../firebase/query';
import CoffeeList from '../../src/coffee/CoffeeList';
import CoffeeFilter from '../../src/coffee/CoffeeFilter';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import ClientOnly from '../../src/common/ClientOnly';

export type CoffeeProps = {
  coffees: Coffee[];
};

const Coffee: NextPage<CoffeeProps> = ({ coffees }) => {
  // console.log('coffees : ', coffees);

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

      <ClientOnly>
        <CoffeeFilter items={coffees} />
        <CoffeeList coffees={coffees} />
      </ClientOnly>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  console.log('Coffee getStaticProps ', process.env.NEXT_PHASE);

  const coffees = await apiCoffee.list(
    limit(12),
    orderBy('created_at', 'desc')
  );

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiCoffee.cache.set(coffees);
  }

  const values = coffees.map(({ company, ...coffee }) => {
    return coffee;
  });

  return {
    props: {
      coffees: values,
    },
    revalidate: 1800,
  };
};

export default Coffee;
