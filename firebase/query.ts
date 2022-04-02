import { firestore, storage } from '../firebase/clientApp';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
} from 'firebase/firestore/lite';
import { getDownloadURL, ref } from 'firebase/storage';

import { BlogEntry } from '../src/types';

import { promises as fs } from 'fs';
import path from 'path';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import client from '../apollo/client';
import { COFFEES_QUERY, COFFEE_QUERY } from '../apollo/queries';
import {
  Coffees,
  Coffees_coffees_coffees,
} from '../apollo/__generated__/Coffees';
import {
  Coffee,
  CoffeeVariables,
  Coffee_coffee_coffee,
} from '../apollo/__generated__/Coffee';

/**
 * blog
 */
const blogCollection = collection(firestore, 'blog');

export const getPosts = async (...queryConstraints: QueryConstraint[]) => {
  const blogQuery = query(
    blogCollection,
    // where('done', '==', false),
    ...queryConstraints
  );
  const querySnapshot = await getDocs(blogQuery);

  const images = await Promise.all(
    querySnapshot.docs.map((doc) =>
      getDownloadURL(ref(storage, doc.data().header_image))
    )
  );

  const posts = querySnapshot.docs.map((doc, i) => {
    return {
      id: doc.id,
      ...doc.data(),
      header_image: images[i],
      publish_date:
        doc.data().publish_date?.toDate().toLocaleDateString() ?? null,
      created_at: doc.data().created_at.toDate().toLocaleDateString(),
    };
  });

  return posts as BlogEntry[];
};

export const getPost = async (id: string) => {
  const docRef = doc(firestore, 'blog', id);
  const result = await getDoc(docRef);

  if (!result.exists()) {
    return null;
  }

  const post = {
    id: docRef.id,
    ...result.data(),
    header_image: await getDownloadURL(
      ref(storage, result.data().header_image)
    ),
    publish_date:
      result.data().publish_date?.toDate().toLocaleDateString() ?? null,
    created_at: result.data().created_at.toDate().toLocaleDateString(),
  };

  return post as BlogEntry;
};

export const apiPost = {
  list: async (...queryConstraints: QueryConstraint[]) => {
    // return PRODUCTS
    console.log('apiPost.list call');

    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      try {
        const data = await fs.readFile(path.join(process.cwd(), 'posts.db'));
        const posts: BlogEntry[] = JSON.parse(data as unknown as string);
        return posts;
      } catch (error) {
        console.log('apiPost.list No cache file');
        return getPosts(...queryConstraints);
      }
    }

    return getPosts(...queryConstraints);
  },
  fetch: async (id: BlogEntry['id']) => {
    // return PRODUCTS.find((product) => product.id === id)
    console.log('apiPost fetch');
    return getPost(id);
  },
  cache: {
    getOne: async (id: string): Promise<BlogEntry | null | undefined> => {
      try {
        const data = await fs.readFile(path.join(process.cwd(), 'posts.db'));
        const posts: BlogEntry[] = JSON.parse(data as unknown as string);

        return posts.find((post) => post.id === id);
      } catch (error) {
        console.log('No cache file');
        return null;
      }
    },
    set: async (posts: BlogEntry[]) => {
      return fs.writeFile(
        path.join(process.cwd(), 'posts.db'),
        JSON.stringify(posts)
      );
    },
  },
};

/**
 * coffee
 */

export const getCoffees = async () => {
  const { data } = await client.query<Coffees>({
    query: COFFEES_QUERY,
  });
  console.log('data : ', data.coffees.coffees);

  const coffees = data.coffees.coffees ?? [];

  return coffees as Coffees_coffees_coffees[];
};

export const getCoffee = async (id: string) => {
  const { data } = await client.query<Coffee, CoffeeVariables>({
    query: COFFEE_QUERY,
    variables: { input: { id } },
  });
  console.log('data : ', data.coffee.coffee);

  const coffee = data.coffee.coffee ?? [];

  return coffee as Coffee_coffee_coffee;
};

export const apiCoffee = {
  list: async () => {
    console.log('apiCoffee.list call');

    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      try {
        const data = await fs.readFile(path.join(process.cwd(), 'coffees.db'));
        const coffees: Coffees_coffees_coffees[] = JSON.parse(
          data as unknown as string
        );
        return coffees;
      } catch (error) {
        console.log('apiCoffee.list No cache file');
        return getCoffees();
      }
    }

    return getCoffees();
  },
  fetch: async (id: Coffee_coffee_coffee['id']) => {
    console.log('apiCoffee fetch');
    return getCoffee(id);
  },
  cache: {
    getOne: async (
      id: string
    ): Promise<Coffee_coffee_coffee | null | undefined> => {
      try {
        const data = await fs.readFile(path.join(process.cwd(), 'coffees.db'));
        const coffees: Coffee_coffee_coffee[] = JSON.parse(
          data as unknown as string
        );

        return coffees.find((coffee) => coffee.id === id);
      } catch (error) {
        console.log('No cache file');
        return null;
      }
    },
    set: async (coffees: Coffees_coffees_coffees[]) => {
      return fs.writeFile(
        path.join(process.cwd(), 'coffees.db'),
        JSON.stringify(coffees)
      );
    },
  },
};
