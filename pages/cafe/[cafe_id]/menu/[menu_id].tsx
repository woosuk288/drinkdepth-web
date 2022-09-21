import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import CafeHeader from '../../../../src/cafe/Header';
import MenuInfo from '../../../../src/cafe/MenuInfo';

import { AuthUserProvider } from '../../../../src/context/AuthUserContext';
import {
  fetchAllMenus,
  fetchCafeMenu,
} from '../../../../src/utils/firebase/services';

const MenuDetailPage: NextPage<Props> = ({ menu }) => {
  return (
    <Container maxWidth="sm" disableGutters>
      {/* Meta */}
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
