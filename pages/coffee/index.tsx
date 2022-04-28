import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
// import PostList from '../../src/blog/PostList';
import Meta from '../../src/Meta';
import { apiCoffee } from '../../apollo/SSG';
import CoffeeList from '../../src/coffee/CoffeeList';
import CoffeeFilter from '../../src/coffee/CoffeeFilter';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import ClientOnly from '../../src/common/ClientOnly';
import { Coffees_coffees_coffees } from '../../apollo/__generated__/Coffees';
// import TagList, { TagListProps } from '../../src/blog/TagList';
import React from 'react';
import { useRouter } from 'next/router';
import FlavorList, { FlavorListProps } from '../../src/coffee/FlavorList';

const metaData = {
  title: '깊이를 마시다. 어떤 음료를 찾으시나요?',
  description: '필요한 음료를 쉽게 찾아보세요.',
  image: '/images/logo_icon.png',
  canonical: 'coffee',
  type: 'blog',
};

export type CoffeeProps = {
  coffees: Coffees_coffees_coffees[];
};

export type CoffeeOption = {
  flavors: string[];
  roasting: string[];
  type: string[];
};

const CoffeesPage: NextPage<CoffeeProps> = ({ coffees }) => {
  // console.log('coffees : ', coffees);

  const [filteredCoffees, setFilteredCoffees] = React.useState(coffees);
  // coffees.filter(coffee => coffee.flavors.some(flavor => checked.flavors.include(flavor)))

  const router = useRouter();

  const parsed = router.query;
  const selectedFlavor: string =
    typeof parsed.flavor !== 'string' || !parsed.flavor ? 'All' : parsed.flavor;

  const flavorList = React.useMemo(
    () =>
      coffees.reduce(
        (list: FlavorListProps['flavorList'], cur) => {
          cur.flavors.forEach((flavor) => {
            if (list[flavor] === undefined) list[flavor] = 1;
            else list[flavor]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 }
      ),
    []
  );

  const [checked, setChecked] = React.useState<CoffeeOption>({
    flavors: [],
    roasting: [],
    type: [],
  });

  const handleCheckbox = (key: keyof CoffeeOption, value: string) => () => {
    const currentIndex = checked[key].indexOf(value);
    const newCheckedKey = [...checked[key]];
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    if (currentIndex === -1) {
      // newChecked.push(option);
      newCheckedKey.push(value);
    } else {
      newCheckedKey.splice(currentIndex, 1);
      // newChecked.splice(currentIndex, 1);
    }

    const newChecked = { ...checked, [key]: newCheckedKey };
    setChecked(newChecked);
    // setChecked(newChecked);
    const filtredData = getFilteredCoffees(coffees, newChecked);
    setFilteredCoffees(filtredData);
  };

  console.log('filteredCoffees: ', filteredCoffees);

  return (
    <Layout>
      <Meta data={metaData} />

      <ClientOnly>
        <FlavorList
          selectedFlavor={selectedFlavor}
          flavorList={flavorList}
          path="coffee"
        />
        <CoffeeFilter
          length={filteredCoffees.length}
          checked={checked}
          handleCheckbox={handleCheckbox}
        />
        <CoffeeList selectedFlavor={selectedFlavor} coffees={filteredCoffees} />
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
    ({ id, name, description, image_url, flavors, tags, roasting, type }) => ({
      id,
      name,
      description,
      image_url,
      flavors,
      tags,
      roasting,
      type,
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

const getFilteredCoffees = (
  coffees: Coffees_coffees_coffees[],
  checked: CoffeeOption
) => {
  const hasFlavor = (coffee: Coffees_coffees_coffees) => {
    return checked.flavors.length > 0
      ? coffee.flavors.some((flavor) => checked.flavors.includes(flavor))
      : true;
  };

  const hasRoasting = (coffee: Coffees_coffees_coffees) => {
    return checked.roasting.length > 0
      ? checked.roasting.includes(coffee.roasting ?? '')
      : true;
  };

  const hasType = (coffee: Coffees_coffees_coffees) => {
    // if (!coffee.type) return false;

    return checked.type.length > 0
      ? checked.type.includes(coffee.type ?? '')
      : true;
  };

  return coffees.filter(hasFlavor).filter(hasRoasting).filter(hasType);
};
