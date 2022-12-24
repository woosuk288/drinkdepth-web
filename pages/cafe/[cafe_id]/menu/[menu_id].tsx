import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Meta from 'src/common/Meta';

import { CAFE_PATH, MENU_PATH } from 'src/utils/routes';
import CafeHeader from 'src/cafe/B2BHeader';
import MenuInfo from 'src/cafe/MenuInfo';

import { AuthUserProvider } from 'src/context/AuthUserContext';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { apiMenu, fetchCafePairingMenus } from 'src/firebase/api';

const MenuDetailPage: NextPage<Props> = ({ menu, pairingMenus }) => {
  const metaData = {
    title: `메뉴 설명 | ${menu.name}`,
    description: menu.description,
    image: menu.images?.['480x480'] ?? '/images/logo_icon.png',
    canonical: `${CAFE_PATH}/${menu.cafeId}${MENU_PATH}/${menu.id}`,
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />
      <AuthUserProvider>
        <CafeHeader title={menu.name} />
        <MenuInfo menu={menu} pairingMenus={pairingMenus} />
      </AuthUserProvider>
    </Container>
  );
};
export default MenuDetailPage;

export type Props = {
  // cafe: CafeType;
  menu: CafeMenuType;
  pairingMenus?: CafeMenuType[];
};

interface Params extends ParsedUrlQuery {
  cafe_id: string;
  menu_id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const menus = await apiMenu.list();

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await apiMenu.cache.set(menus);
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

  let menu = await apiMenu.cache.get(cafe_id, menu_id);

  if (!menu) {
    menu = await apiMenu.fetch(cafe_id, menu_id);
  }

  if (!menu) {
    return {
      notFound: true,
    };
  }

  let pairingMenus: CafeMenuType[] = [];
  const menuIds = menu.pairingMenus;

  if (menuIds) {
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      const allMenus = await apiMenu.cache.list();
      if (allMenus) {
        pairingMenus = allMenus.filter((cafeMenu) =>
          menuIds.includes(cafeMenu.id)
        );
      }
    } else {
      pairingMenus = await fetchCafePairingMenus(cafe_id, menuIds);
    }
  }

  return {
    props: {
      menu,
      pairingMenus,
    },

    revalidate: 1800,
  };
};
