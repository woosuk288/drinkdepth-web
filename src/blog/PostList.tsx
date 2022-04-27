import styled from '@emotion/styled';

import React from 'react';
import { Posts_posts_posts } from '../../apollo/__generated__/Posts';
import useInfiniteScroll, {
  useInfiniteScrollType,
} from '../hooks/useInfiniteScroll';
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

type PostListProps = {
  selectedTag: string;
  posts: Posts_posts_posts[];
};

function PostList({ selectedTag, posts }: PostListProps) {
  const { containerRef, list }: useInfiniteScrollType = useInfiniteScroll(
    selectedTag,
    posts
  );

  return (
    <PostListWrapper ref={containerRef}>
      {list.map((post, i) => (
        <PostItem {...post} link={post.id} key={post.id} priority={i < 3} />
      ))}
    </PostListWrapper>
  );
}

export default PostList;
