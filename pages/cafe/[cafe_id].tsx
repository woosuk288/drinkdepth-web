import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import CafeHeader from '../../src/cafe/B2BHeader';
import CafeInfo from '../../src/cafe/CafeInfo';
import Menus from '../../src/cafe/Menus';
import Meta from '../../src/common/Meta';

import { CAFE_PATH } from 'src/utils/routes';
import useScrollY from 'src/hooks/useScrollY';

import { apiCafe, apiMenu, fetchCafeMenus, fetchCafes } from 'src/firebase/api';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

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
  const {} = useScrollY();

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />

      <CafeHeader title={cafe.name} />
      <CafeInfo cafe={cafe} />
      <Menus
        menuCategories={cafe.menuCategories}
        menus={menus.filter((m) => !m.disabled)}
      />
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
  let cafes;

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    cafes = await apiCafe.cache.list();
    if (!cafes) {
      cafes = await apiCafe.list();
      await apiCafe.cache.set(cafes);
    }
  } else {
    cafes = await fetchCafes();
  }

  // const cafes = await apiCafe.list();

  // if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
  //   await apiCafe.cache.set(cafes);
  // }

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
  const { cafe_id } = params!;

  let cafe = await apiCafe.cache.get(cafe_id);

  if (!cafe) {
    cafe = await apiCafe.fetch(cafe_id);
  }

  if (!cafe) {
    return {
      notFound: true,
    };
  }

  let menus;

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    menus = await apiMenu.cache.list();
    if (!menus) {
      menus = await apiMenu.list();
      await apiMenu.cache.set(menus);
    }
  } else {
    menus = await fetchCafeMenus(cafe_id);
  }

  if (!menus || !Array.isArray(menus)) {
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
