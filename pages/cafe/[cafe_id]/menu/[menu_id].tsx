import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Meta from 'src/common/Meta';
import { CAFE_PATH, MENU_PATH } from 'src/utils/routes';
import CafeHeader from '../../../../src/cafe/Header';
import MenuInfo from '../../../../src/cafe/MenuInfo';

import { AuthUserProvider } from '../../../../src/context/AuthUserContext';
import {
  fetchAllMenus,
  fetchCafeMenu,
} from '../../../../src/utils/firebase/services';

const MenuDetailPage: NextPage<Props> = ({ menu }) => {
  const metaData = {
    title: `메뉴 설명 | ${menu.name}`,
    description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
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
  const menus = await fetchAllMenus();

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
  const menu = await fetchCafeMenu(params!.cafe_id, params!.menu_id);

  if (!menu) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
    },

    // revalidate: 900,
  };
};
