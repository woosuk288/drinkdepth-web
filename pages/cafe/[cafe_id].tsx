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
} from '../../src/firebase/services';
import { CAFE_PATH } from 'src/utils/routes';
import useScrollY from 'src/hooks/useScrollY';
import { menuApi } from 'src/utils/cacheAPIs';

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

      <AuthUserProvider>
        <CafeHeader title={cafe.name} />
        <CafeInfo cafe={cafe} />
        <Menus menus={menus} />
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
  // const menus = await fetchCafeMenus(params!.cafe_id);
  const menus = await menuApi.listByCafe(params!.cafe_id);

  if (menus) {
    const allMenus = await menuApi.list();
    const newMenues = allMenus.map(
      (cacheMenu) => menus.find((menu) => menu.id === cacheMenu.id) ?? cacheMenu
    );
    await menuApi.cache.set(newMenues);
  }

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
