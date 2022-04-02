import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import type { NextPage } from 'next';
import { apiPost } from '../../firebase/query';
import PostContent from '../../src/blog/PostContent';
import PostHead from '../../src/blog/PostHead';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';

import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { Post_post_post } from '../../apollo/__generated__/Post';

type PostPageProps = {
  post: Post_post_post;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  // console.log('post : ', post);

  if (!post) return <div>데이터 없음</div>;

  const metaData = {
    title: post.name,
    description: post.tags.map((t) => `#${t}`).join(' '),
    image: post.image_url,
    canonical: post.id,
    type: 'article',
  };

  return (
    <Layout>
      <Meta data={metaData} />
      <PostHead {...post} title={post.name} headerUrl={post.image_url} />
      <PostContent content={post.content} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('post_id getStaticPaths : ', process.env.NEXT_PHASE);
  const posts = await apiPost.list();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiPost.cache.set(posts);
  }

  return {
    paths: posts.map((post) => ({
      params: {
        post_id: post.id,
        name: post.name,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params : ', params);

  let post = await apiPost.cache.getOne(params?.post_id as string);

  post ? console.log('cache post') : console.log('fetch post');

  if (!post) {
    post = await apiPost.fetch(params?.post_id as string);
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },

    revalidate: 3600,
  };
};

export default PostPage;
