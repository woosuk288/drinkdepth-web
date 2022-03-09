import styled from '@emotion/styled';

import React from 'react';
import { BlogProps } from '../../pages/blog';
// import useInfiniteScroll, {
//   useInfiniteScrollType,
// } from '../../hooks/useInfiniteScroll'
import PostItem from './PostItem';

export const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  max-width: 100%;

  margin: 0 auto;
  padding: 30px 20px 100px;
  justify-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    max-width: 780px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 100%;

    padding: 20px;
  }
`;

function PostList({ /* selectedCategory, */ posts }: BlogProps) {
  // const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
  //   selectedCategory,
  //   posts
  // )

  return (
    <PostListWrapper /* ref={containerRef} */>
      {posts.map((post, key) => (
        <PostItem {...post} link={post.id} key={post.id} />
      ))}
    </PostListWrapper>
  );
}

export default PostList;
