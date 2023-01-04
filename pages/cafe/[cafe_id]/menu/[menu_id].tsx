import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Meta from 'src/common/Meta';

import { CAFE_PATH, MENU_PATH } from 'src/utils/routes';
import CafeHeader from 'src/cafe/B2BHeader';
import MenuInfo from 'src/cafe/MenuInfo';

import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { apiCafe, apiMenu, fetchCafePairingMenus } from 'src/firebase/api';

const MenuDetailPage: NextPage<Props> = ({ cafe, menu, pairingMenus }) => {
  const metaData = {
    title: `메뉴 ${menu.name} | ${cafe.name} - 드링크뎁스 스마트 메뉴판`,
    description: menu.description,
    image: menu.images?.['480x480'] ?? '/images/logo_icon.png',
    canonical: `${CAFE_PATH}/${menu.cafeId}${MENU_PATH}/${menu.id}`,
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />

      <CafeHeader title={menu.name} />
      <MenuInfo menu={menu} pairingMenus={pairingMenus} />
    </Container>
  );
};
export default MenuDetailPage;

export type Props = {
  cafe: CafeType;
  menu: CafeMenuType;
  pairingMenus?: CafeMenuType[];
};

interface Params extends ParsedUrlQuery {
  cafe_id: string;
  menu_id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let menus;

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    menus = await apiMenu.cache.list();
    if (!menus) {
      menus = await apiMenu.list();
      await apiMenu.cache.set(menus);
    }
  } else {
    menus = await apiMenu.list();
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

  let cafe = await apiCafe.cache.get(cafe_id);

  if (!cafe) {
    cafe = await apiCafe.fetch(cafe_id);
  }

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
      cafe,
      menu,
      pairingMenus,
    },

    revalidate: 1800,
  };
};
