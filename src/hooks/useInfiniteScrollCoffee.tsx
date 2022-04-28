import { MutableRefObject, useState, useRef, useMemo, useEffect } from 'react';
import { Coffees_coffees_coffees } from '../../apollo/__generated__/Coffees';

export type useInfiniteScrollCoffeeType<T> = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  list: T[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 9;

function useInfiniteScrollCoffee<T>(
  selectedFlavor: string,
  items: T[]
): useInfiniteScrollCoffeeType<T> {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const observer: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver>(null);
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      // 저희는 단 하나의 요소만 관측할 것이기 때문에 관측 요소 배열 파라미터에 해당하는 entries 인자에는 하나의 데이터만 존재합니다.
      // 그리고, 배열 내의 데이터에는 isIntersecting이라는 프로퍼티를 통해 화면에 노출되었는지를 확인할 수 있습니다.
      if (!entries[0].isIntersecting) return;

      // 따라서 해당 프로퍼티를 통해 화면에 노출된 경우에는 count 값에 1을 더해주어 10개의 데이터가 추가적으로 출력되도록 할 것이고, 그 즉시 해당 요소의 관측을 중단하도록 구현했습니다.
      setCount((value) => value + 1);
      observer.unobserve(entries[0].target);
    });
  }, []);

  // 카테고리 변경시 1로
  useEffect(() => setCount(1), [selectedFlavor]);

  //이렇게 observer를 선언했으니, 이를 통해 observe 메서드를 사용하는 부분을 구현해봅시다.
  //이를 위해 useEffect 훅을 사용할 것이고, count 값이 변경될 때마다 ref로 연결된 요소의 맨 마지막 자식 노드를 관측할 것이기 때문에 다음과 같이 코드를 작성해줘야 합니다.
  // 그리고 ref로 요소에 제대로 연결되어있는지와 더 불러올 데이터가 있는지 확인한 후, 조건을 충족하면 선택한 요소의 맨 마지막 자식 노드를 관측해줍니다.
  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= items.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return;

    observer.current?.observe(
      containerRef.current.children[containerRef.current.children.length - 1]
    );
  }, [count, items.length, selectedFlavor]);

  return {
    containerRef,
    list: items.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
}

export default useInfiniteScrollCoffee;
