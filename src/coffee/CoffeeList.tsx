import React from 'react';
import { PostListWrapper } from '../blog/PostList';
import { Coffee } from '../types';
import CoffeeItem from './CoffeeItem';

type CoffeeListProps = {
  coffees: Coffee[];
};
function CoffeeList({ coffees }: CoffeeListProps) {
  return (
    <PostListWrapper>
      {coffees.map((coffee) => (
        <CoffeeItem {...coffee} key={coffee.id} />
      ))}
    </PostListWrapper>
  );
}

export default CoffeeList;
