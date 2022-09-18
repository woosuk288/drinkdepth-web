import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import CafeHeader from '../../../../src/cafe/Header';
import MenuDetail from '../../../../src/cafe/MenuDetail';
import { cafeMenus } from '../../[cafe_id]';
import { AuthUserProvider } from '../../../../src/context/AuthUserContext';
import { fetchMenu } from '../../../../src/utils/firebase/services';

const MenuDetailPage: NextPage<{ item: CafeMenuType }> = ({ item }) => {
  return (
    <Container maxWidth="sm" disableGutters>
      {/* Meta */}
      <AuthUserProvider>
        <CafeHeader title={item.name} />
        <MenuDetail item={item} />
      </AuthUserProvider>
    </Container>
  );
};
export default MenuDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: cafeMenus.map((menu) => ({
      params: {
        cafe_id: menu.cafeId,
        menu_id: menu.id,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { menu_id } = params as { cafe_id: string; menu_id: string };
  const menuItem = await fetchMenu(menu_id);

  if (!menuItem) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      item: JSON.parse(JSON.stringify(menuItem)),
    },

    // revalidate: 900,
  };
};
