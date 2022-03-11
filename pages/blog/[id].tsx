import { GetServerSideProps } from 'next';
import React from 'react';
import type { NextPage } from 'next';
import { getPost } from '../../firebase/query';
import PostContent from '../../src/blog/PostContent';
import PostHead from '../../src/blog/PostHead';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { BlogEntry } from '../../types';

type PostProps = {
  post: BlogEntry | null;
};

const Post: NextPage<PostProps> = ({ post }) => {
  console.log('post : ', post);

  if (!post) return <div>데이터 없음</div>;

  const metaData = {
    title: post.name,
    description: post.tags.map((t) => `#${t}`).join(' '),
    image: post.header_image,
    canonical: post.id,
    type: 'article',
  };

  return (
    <Layout>
      <Meta data={metaData} />
      <PostHead {...post} title={post.name} headerUrl={post.header_image} />
      <PostContent content={post.content} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // ...
  if (!params || typeof params.id !== 'string') {
    return { notFound: true };
  }

  const post = (await getPost(params.id)) as BlogEntry;

  if (!post) {
    return {
      notFound: true,
    };
  }

  console.log('post from server: ', post);

  // 해당 페이지에 props로 보냄
  return { props: { post } };
};

export default Post;
