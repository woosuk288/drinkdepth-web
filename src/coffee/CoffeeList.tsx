import { useQuery } from '@apollo/client';
import React from 'react';
import { BOOKMARKS_QUERY } from '../../apollo/queries';
import { bookmarks } from '../../apollo/__generated__/bookmarks';
import { Coffees_coffees_coffees } from '../../apollo/__generated__/Coffees';
import { PostListWrapper } from '../blog/PostList';

import useInfiniteScrollCoffee, {
  useInfiniteScrollCoffeeType,
} from '../hooks/useInfiniteScrollCoffee';
import CoffeeItem from './CoffeeItem';

type CoffeeListProps = {
  selectedFlavor: string;
  coffees: Coffees_coffees_coffees[];
};
function CoffeeList({ selectedFlavor, coffees }: CoffeeListProps) {
  const { data, loading, error } = useQuery<bookmarks>(BOOKMARKS_QUERY);

  // if(loading) return <LinearProgress />
  // const bookmarks = data.bookmarks.bookmarks;

  const { containerRef, coffeeList }: useInfiniteScrollCoffeeType =
    useInfiniteScrollCoffee(selectedFlavor, coffees);

  console.log('coffeeList : ', coffeeList);

  return (
    <PostListWrapper ref={containerRef}>
      {coffeeList.map((coffee, i) => (
        <CoffeeItem
          {...coffee}
          key={coffee.id}
          isSaved={
            loading
              ? null
              : !!data?.bookmarks.bookmarks?.some(
                  (b) => b.product_id === coffee.id
                )
          }
          priority={i < 3}
        />
      ))}
    </PostListWrapper>
  );
}

export default CoffeeList;
