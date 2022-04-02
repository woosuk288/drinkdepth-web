import { MutableRefObject, useState, useRef, useMemo, useEffect } from 'react';
import { Posts_posts_posts } from '../../apollo/__generated__/Posts';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: Posts_posts_posts[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 9;

const useInfiniteScroll = function (
  selectedTag: string,
  posts: Posts_posts_posts[]
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<Posts_posts_posts[]>(
    () =>
      posts.filter(({ tags }: Posts_posts_posts) =>
        selectedTag !== 'All' ? tags.includes(selectedTag) : true
      ),
    [selectedTag]
  );

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount((value) => value + 1);
      observer.unobserve(entries[0].target);
    });
  }, []);

  // useEffect(() => setCount(1), [selectedTag])

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return;

    observer.current?.observe(
      containerRef.current.children[containerRef.current.children.length - 1]
    );
  }, [count, selectedTag]);

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
