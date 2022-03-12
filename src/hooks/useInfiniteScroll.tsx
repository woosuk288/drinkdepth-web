import { MutableRefObject, useState, useRef, useMemo, useEffect } from 'react';
import { BlogEntry } from '../types';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: BlogEntry[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 9;

const useInfiniteScroll = function (
  selectedTag: string,
  posts: BlogEntry[]
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  const postListByCategory = useMemo<BlogEntry[]>(
    () =>
      posts.filter(({ tags }: BlogEntry) =>
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
