import { promises as fs } from 'fs';
import path from 'path';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import client from './client';
import {
  COFFEES_QUERY,
  COFFEE_QUERY,
  POSTS_QUERY,
  POST_QUERY,
} from './queries';
import { Coffees, Coffees_coffees_coffees } from './__generated__/Coffees';
import {
  Coffee,
  CoffeeVariables,
  Coffee_coffee_coffee,
} from './__generated__/Coffee';
import { Posts, Posts_posts_posts } from './__generated__/Posts';
import { Post, PostVariables, Post_post_post } from './__generated__/Post';

/**
 * blog
 */

export const getPosts = async () => {
  const { data } = await client.query<Posts>({
    query: POSTS_QUERY,
  });

  const posts = data.posts.posts ?? [];

  return posts as Posts_posts_posts[];
};

export const getPost = async (id: string) => {
  const { data } = await client.query<Post, PostVariables>({
    query: POST_QUERY,
    variables: { input: { id } },
  });

  const post = data.post.post ?? [];

  return post as Post_post_post;
};

export const apiPost = {
  list: async () => {
    // return PRODUCTS
    console.log('apiPost.list call');

    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      try {
        const data = await fs.readFile(path.join(process.cwd(), 'posts.db'));
        const posts: Posts_posts_posts[] = JSON.parse(
          data as unknown as string
        );
        return posts;
      } catch (error) {
        console.log('apiPost.list No cache file');
        return getPosts();
      }
    }

    return getPosts();
  },
  fetch: async (id: Post_post_post['id']) => {
    // return PRODUCTS.find((product) => product.id === id)
    console.log('apiPost fetch');
    return getPost(id);
  },
  cache: {
    getOne: async (id: string): Promise<Post_post_post | null | undefined> => {
      try {
        const data = await fs.readFile(path.join(process.cwd(), 'posts.db'));
        const posts: Post_post_post[] = JSON.parse(data as unknown as string);

        return posts.find((post) => post.id === id);
      } catch (error) {
        console.log('No cache file');
        return null;
      }
    },
    set: async (posts: Posts_posts_posts[]) => {
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

  const coffees = data.coffees.coffees ?? [];

  return coffees as Coffees_coffees_coffees[];
};

export const getCoffee = async (id: string) => {
  const { data } = await client.query<Coffee, CoffeeVariables>({
    query: COFFEE_QUERY,
    variables: { input: { id } },
  });

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
