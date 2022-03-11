import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
import { limit } from 'firebase/firestore';
import PostList from '../../src/blog/PostList';
import { BlogEntry } from '../../src/types';
import Meta from '../../src/Meta';
import { getPosts } from '../../firebase/query';

export type BlogProps = {
  posts: BlogEntry[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  console.log('posts : ', posts);

  const metaData = {
    title: '깊이를 마시다. 블로그',
    description: '음료에 관한 소식을 전해드려요.',
    image: '/images/logo_icon.png',
    canonical: 'blog',
    type: 'blog',
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <PostList /* selectedCategory={selectedCategory} */ posts={posts} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts(limit(15))) as BlogEntry[];

  return {
    props: {
      posts,
    },
    // revalidate: 60
  };
};

export default Blog;
