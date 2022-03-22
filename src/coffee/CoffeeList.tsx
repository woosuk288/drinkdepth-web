import { useQuery } from '@apollo/client';
import React from 'react';
import { BOOKMARKS_QUERY } from '../../apollo/queries';
import { bookmarks } from '../../apollo/__generated__/bookmarks';
import { PostListWrapper } from '../blog/PostList';
import { Coffee } from '../types';
import CoffeeItem from './CoffeeItem';

type CoffeeListProps = {
  coffees: Coffee[];
};
function CoffeeList({ coffees }: CoffeeListProps) {
  const { data, loading, error } = useQuery<bookmarks>(BOOKMARKS_QUERY);

  // if(loading) return <LinearProgress />
  // const bookmarks = data.bookmarks.bookmarks;

  console.log('data : ', data);

  return (
    <PostListWrapper>
      {coffees.map((coffee) => (
        <CoffeeItem
          {...coffee}
          key={coffee.id}
          isSaved={
            loading
              ? null
              : !!data?.bookmarks?.bookmarks?.some(
                  (b) => b.product_id === coffee.id
                )
          }
        />
      ))}
    </PostListWrapper>
  );
}

export default CoffeeList;
