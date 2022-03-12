import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
import { limit } from 'firebase/firestore';
import PostList from '../../src/blog/PostList';
import { BlogEntry } from '../../src/types';
import Meta from '../../src/Meta';
import { getPosts } from '../../firebase/query';
import TagList, { TagListProps } from '../../src/blog/TagList';
import { useRouter } from 'next/router';

const metaData = {
  title: '깊이를 마시다. 블로그',
  description: '음료에 관한 소식을 전해드려요.',
  image: '/images/logo_icon.png',
  canonical: 'blog',
  type: 'blog',
};

export type BlogProps = {
  posts: BlogEntry[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  const router = useRouter();

  const parsed = router.query;
  const selectedTag: string =
    typeof parsed.tag !== 'string' || !parsed.tag ? 'All' : parsed.tag;

  const tagList = React.useMemo(
    () =>
      posts.reduce(
        (list: TagListProps['tagList'], cur) => {
          cur.tags.forEach((tag) => {
            if (list[tag] === undefined) list[tag] = 1;
            else list[tag]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 }
      ),
    []
  );

  return (
    <Layout>
      <Meta data={metaData} />

      <TagList selectedTag={selectedTag} tagList={tagList} />
      <PostList selectedTag={selectedTag} posts={posts} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts(limit(15))) as BlogEntry[];

  console.log('posts : ', posts);

  return {
    props: {
      posts,
    },
    // revalidate: 60
  };
};

export default Blog;
