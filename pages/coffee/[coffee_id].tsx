import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import type { NextPage } from 'next';
import { apiCoffee, getCoffee } from '../../firebase/query';
import CoffeeContent from '../../src/coffee/CoffeeContent';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { Coffee } from '../../src/types';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

type CoffeePageProps = {
  coffee: Coffee | null;
};

const CoffeePage: NextPage<CoffeePageProps> = ({ coffee }) => {
  // console.log('CoffeePage : ', coffee);

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

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('coffee_id getStaticPaths : ', process.env.NEXT_PHASE);
  const coffees = await apiCoffee.list();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiCoffee.cache.set(coffees);
  }

  return {
    paths: coffees.map((coffee) => ({
      params: {
        coffee_id: coffee.id,
        name: coffee.name,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params : ', params);

  let coffee = await apiCoffee.cache.getOne(params?.coffee_id as string);

  coffee ? console.log('cache coffee') : console.log('fetch coffee');

  if (!coffee) {
    coffee = await apiCoffee.fetch(params?.coffee_id as string);
  }

  if (!coffee) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      coffee,
    },

    revalidate: 900,
  };
};

export default CoffeePage;
