import { useRef, useEffect } from 'react';

function useScrollY(pageKey?: string) {
  const topElementRef = useRef<HTMLElement | null>(null);

  const bottomElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const key = getScrollYKey(pageKey);
    const topKey = 'top-' + key;
    const bottomKey = 'bottom-' + key;

    const targetElement = document.querySelector('body');

    if (!document.getElementById(topKey)) {
      const el = document.createElement('div');
      el.id = topKey;
      // el.classList.add(topKey);
      targetElement?.insertBefore(el, targetElement.firstChild);

      // topElementRef.current = document.querySelector(`.${topKey}`);
      topElementRef.current = document.getElementById(topKey);
    }

    if (!document.getElementById(bottomKey)) {
      const el = document.createElement('div');
      el.id = bottomKey;
      // el.classList.add(bottomKey);
      targetElement?.insertBefore(el, null);

      // bottomElementRef.current = document.querySelector(`.${bottomKey}`);
      topElementRef.current = document.getElementById(bottomKey);
    }

    const elementObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 관찰되고 있는 entry가 보여지게 된 다면
            sessionStorage.setItem(key, '0');
          } else {
          }
        });
      },
      {
        // threshold: 0.5, // 확인을 위해 이미지 절반이 나타날 때 로딩한다.
      }
    );

    if (topElementRef.current && bottomElementRef.current) {
      elementObserver.observe(topElementRef.current);
      elementObserver.observe(bottomElementRef.current);
    }
    return () => {
      elementObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topElementRef.current, bottomElementRef.current]);

  useEffect(() => {
    const key = getScrollYKey(pageKey);
    setTimeout(() => {
      const scroll = parseInt(sessionStorage.getItem(key) ?? '0', 10);
      window.scrollTo(0, scroll);
    });
  }, [pageKey]);

  return { topElementRef, bottomElementRef };
}

export default useScrollY;

export const getScrollYKey = (pageKey?: string) =>
  (pageKey ?? window.location.href) + '-' + 'scrollYKey';
