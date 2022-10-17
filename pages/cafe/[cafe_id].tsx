import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import CafeHeader from '../../src/cafe/Header';
import CafeInfo from '../../src/cafe/CafeInfo';
import Menus from '../../src/cafe/Menus';
import Meta from '../../src/common/Meta';
import { AuthUserProvider } from '../../src/context/AuthUserContext';
import {
  fetchCafe,
  fetchCafeMenus,
  fetchCafes,
} from '../../src/utils/firebase/services';
import { CAFE_PATH } from 'src/utils/routes';
import { useEffect, useRef } from 'react';
import { SCROLL_Y } from 'src/utils/constants';

const CafePage: NextPage<Props> = ({ cafe, menus }) => {
  const metaData = {
    title: `카페 소개 및 메뉴 | ${cafe.name}`,
    description: cafe.introduce,
    image: cafe.imageURL,
    canonical: `${CAFE_PATH}/${cafe.id}`,
  };

  /**
   * 페이지 스크롤 위치 기억 처리 위함
   */
  // const divRef = useRef<HTMLDivElement>(null); // 태그 요소
  const divRef = useRef<HTMLDivElement>(null); // 태그 요소
  const divRef2 = useRef<HTMLDivElement>(null); // 태그 요소
  useEffect(() => {
    const divObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 관찰되고 있는 entry가 보여지게 된 다면
            sessionStorage.setItem(SCROLL_Y, '0');
          } else {
          }
        });
      },
      {
        // threshold: 0.5, // 확인을 위해 이미지 절반이 나타날 때 로딩한다.
      }
    );

    if (divRef.current && divRef2.current) {
      divObserver.observe(divRef.current);
      divObserver.observe(divRef2.current);
    }
    return () => {
      divObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef.current, divRef2.current]);

  useEffect(() => {
    setTimeout(() => {
      const scroll = parseInt(sessionStorage.getItem(SCROLL_Y) ?? '0', 10);
      window.scrollTo(0, scroll);
    });
  }, []);

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />

      <AuthUserProvider>
        <CafeHeader title={cafe.name} />
        <div ref={divRef}></div>
        <CafeInfo cafe={cafe} />
        <Menus menus={menus} />
        <div ref={divRef2}></div>
      </AuthUserProvider>
    </Container>
  );
};
export default CafePage;

type Props = {
  cafe: CafeType;
  menus: CafeMenuType[];
};

interface Params extends ParsedUrlQuery {
  cafe_id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const cafes = await fetchCafes();

  return {
    paths: cafes.map((cafe) => ({
      params: {
        cafe_id: cafe.id,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const cafe = await fetchCafe(params!.cafe_id);
  const menus = await fetchCafeMenus(params!.cafe_id);

  if (!cafe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cafe,
      menus,
    },

    revalidate: 1800,
  };
};
