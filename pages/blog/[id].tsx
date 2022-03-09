import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { getPost, getPosts } from '../../firebase/query';
import PostContent from '../../src/blog/PostContent';
import PostHead from '../../src/blog/PostHead';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { BlogEntry } from '../../types';

type PostProps = {
  post: BlogEntry;
};

function Post({ post }: PostProps) {
  console.log('post : ', post);

  const metaData = {
    title: post.name,
    description: post.content.find((p) => p.type === 'text').value.slice(0, 80),
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
}

export const getStaticPaths: GetStaticPaths = async () => {
  // posts를 받기 위해 fetch
  const posts = await getPosts();
  // // pre-render할 Path를 얻음 (posts를 통해서)
  const paths = posts.map((post) => ({
    // params: { id: post.id },
    params: post,
  }));
  // // 우리는 오로지 이 path들만 빌드타임에 프리렌더 함
  // // { fallback: false } 는 다른 routes들은 404임을 의미
  // // true이면 만들어지지 않은 것도 추후 요청이 들어오면 만들어 줄 거라는 뜻
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params: ', params);

  // params는 post `id`를 포함하고 있다
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()

  if (!params || typeof params.id !== 'string') {
    return { props: { error: '조회 오류!' } };
  }

  const post = await getPost(params.id);

  console.log('post: ', post);

  // 해당 페이지에 props로 보냄
  return { props: { post } };
};

export default Post;
