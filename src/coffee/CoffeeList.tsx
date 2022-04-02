import { useQuery } from '@apollo/client';
import React from 'react';
import { BOOKMARKS_QUERY } from '../../apollo/queries';
import { bookmarks } from '../../apollo/__generated__/bookmarks';
import { Coffees_coffees_coffees } from '../../apollo/__generated__/Coffees';
import { PostListWrapper } from '../blog/PostList';
import CoffeeItem from './CoffeeItem';

type CoffeeListProps = {
  coffees: Coffees_coffees_coffees[];
};
function CoffeeList({ coffees }: CoffeeListProps) {
  const { data, loading, error } = useQuery<bookmarks>(BOOKMARKS_QUERY);

  // if(loading) return <LinearProgress />
  // const bookmarks = data.bookmarks.bookmarks;

  return (
    <PostListWrapper>
      {coffees.map((coffee) => (
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
        />
      ))}
    </PostListWrapper>
  );
}

export default CoffeeList;
