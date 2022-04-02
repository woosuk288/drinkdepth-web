import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
// import PostList from '../../src/blog/PostList';
import Meta from '../../src/Meta';
import { apiCoffee } from '../../firebase/query';
import CoffeeList from '../../src/coffee/CoffeeList';
import CoffeeFilter from '../../src/coffee/CoffeeFilter';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import ClientOnly from '../../src/common/ClientOnly';
import { Coffees_coffees_coffees } from '../../apollo/__generated__/Coffees';

export type CoffeeProps = {
  coffees: Coffees_coffees_coffees[];
};

const CoffeesPage: NextPage<CoffeeProps> = ({ coffees }) => {
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

  const coffees = await apiCoffee.list();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiCoffee.cache.set(coffees);
  }

  const coffeeArr = coffees.map(
    ({ id, name, description, image_url, tags }) => ({
      id,
      name,
      description,
      image_url,
      tags,
    })
  );

  return {
    props: {
      coffees: coffeeArr,
    },
    revalidate: 1800,
  };
};

export default CoffeesPage;
