import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Meta from 'src/common/Meta';
import { apiMenuCache } from 'src/utils/cacheAPIs';
import { CAFE_PATH, MENU_PATH } from 'src/utils/routes';
import CafeHeader from 'src/cafe/Header';
import MenuInfo from 'src/cafe/MenuInfo';

import { AuthUserProvider } from 'src/context/AuthUserContext';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { fetchAllMenus, fetchCafeMenu } from 'src/utils/firebase/services';

const MenuDetailPage: NextPage<Props> = ({ menu }) => {
  const metaData = {
    title: `메뉴 설명 | ${menu.name}`,
    description: menu.description,
    image: menu.imageURL,
    canonical: `${CAFE_PATH}/${menu.cafeId}${MENU_PATH}/${menu.id}`,
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />
      <AuthUserProvider>
        <CafeHeader title={menu.name} />
        <MenuInfo menu={menu} />
      </AuthUserProvider>
    </Container>
  );
};
export default MenuDetailPage;

export type Props = {
  // cafe: CafeType;
  menu: CafeMenuType;
};

interface Params extends ParsedUrlQuery {
  cafe_id: string;
  menu_id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let menus: CafeMenuType[] | undefined | null;

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    // 캐시에서 가져온다.
    menus = await apiMenuCache.list();
    if (!menus) {
      // 없으면 서버에서 가져온다.
      menus = await fetchAllMenus();
      // 캐시에 저장한다.
      await apiMenuCache.set(menus);
    }
  } else {
    menus = await fetchAllMenus();
  }

  return {
    paths: menus.map((menu) => ({
      params: {
        cafe_id: menu.cafeId,
        menu_id: menu.id,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { cafe_id, menu_id } = params!;

  let menu: CafeMenuType | undefined | null;

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    menu = await apiMenuCache.get(cafe_id, menu_id);
  }

  if (!menu) {
    menu = await fetchCafeMenu(cafe_id, menu_id);
  }

  if (!menu) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
    },

    revalidate: 1800,
  };
};
