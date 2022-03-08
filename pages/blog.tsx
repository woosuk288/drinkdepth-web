import * as React from 'react';
import type { NextPage } from 'next';
import Link from '../src/Link';
import Layout from '../src/Layout';
import { firestore, storage } from '../firebase/clientApp';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import PostList from '../src/blog/PostList';
import { getDownloadURL, ref } from 'firebase/storage';

export type BlogProps = {
  posts: BlogEntry[];
};
export type BlogEntry = {
  name: string;
  header_image: string;
  content: any[];
  // gold_text: string,
  // created_at: Date;
  created_at: string;
  publish_date: Date;
  // reviewed: boolean,
  status: string;
  tags: string[];
};

type CU = {
  created_at?: Timestamp;
  updated_at?: Timestamp;
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  console.log('posts : ', posts);

  return (
    <Layout>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <PostList /* selectedCategory={selectedCategory} */ posts={posts} />
    </Layout>
  );
};

const blogCollection = collection(firestore, 'blog');

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const todosQuery = query(
    blogCollection,
    // where('done', '==', false),
    limit(15)
  );
  const querySnapshot = await getDocs(todosQuery);

  const result: QueryDocumentSnapshot<DocumentData>[] = [];
  querySnapshot.forEach((snapshot) => {
    const post = snapshot.data();
    post.created_at = post.created_at.toDate().toDateString();
    // post.header_image = getDownloadURL(post.header_image).then((res) => setUrl(res));

    result.push(post);
  });

  console.log('result: ', result);

  const images = await Promise.all(
    result.map((r) => getDownloadURL(ref(storage, r.header_image)))
  );
  console.log('images : ', images);
  const posts = result.map((r, i) => {
    return {
      ...r,
      header_image: images[i],
    };
  });

  console.log('posts : ', posts);

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
