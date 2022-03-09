import * as React from 'react';
import type { NextPage } from 'next';
import Link from '../src/Link';
import Layout from '../src/Layout';
import { limit } from 'firebase/firestore';
import PostList from '../src/blog/PostList';
import { BlogEntry } from '../types';
import Meta from '../src/Meta';
import { getPosts } from '../firebase/query';

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

      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <PostList /* selectedCategory={selectedCategory} */ posts={posts} />
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await getPosts(limit(15));

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
