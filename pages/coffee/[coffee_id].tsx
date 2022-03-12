import { GetServerSideProps } from 'next';
import React from 'react';
import type { NextPage } from 'next';
import { getCoffee } from '../../firebase/query';
import CoffeeContent from '../../src/coffee/CoffeeContent';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { Coffee } from '../../src/types';

type CoffeePageProps = {
  coffee: Coffee | null;
};

const CoffeePage: NextPage<CoffeePageProps> = ({ coffee }) => {
  console.log('CoffeePage : ', coffee);

  if (!coffee) return <div>데이터 없음</div>;

  const metaData = {
    title: coffee.name,
    description: coffee.tags.map((t) => `#${t}`).join(' '),
    image: coffee.main_image,
    canonical: coffee.id,
    type: 'article',
  };

  return (
    <Layout>
      <Meta data={metaData} />
      <CoffeeContent coffee={coffee} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // ...
  if (!params || typeof params.coffee_id !== 'string') {
    return { notFound: true };
  }

  const coffee = (await getCoffee(params.coffee_id)) as Coffee;
  console.log('coffee from server: ', coffee);

  if (!coffee) {
    return {
      notFound: true,
    };
  }

  // 해당 페이지에 props로 보냄
  return { props: { coffee } };
};

export default CoffeePage;
