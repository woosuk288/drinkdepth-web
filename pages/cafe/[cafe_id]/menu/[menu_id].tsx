import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import CafeHeader from '../../../../src/cafe/Header';
import { testMenuData } from '../../../../src/cafe/Menu';
import MenuDetail, { MenuDetailProps } from '../../../../src/cafe/MenuDetail';

const MenuDetailPage: NextPage<MenuDetailProps> = ({ item }) => {
  return (
    <Container maxWidth="sm" disableGutters>
      <CafeHeader title={item.name} />
      <MenuDetail item={item} />
    </Container>
  );
};
export default MenuDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: testMenuData.map((menu) => ({
      params: {
        cafe_id: menu.cafeId,
        menu_id: menu.id,
        name: menu.name,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params : ', params);

  let item = testMenuData.find(
    (menu) => menu.cafeId === params?.cafe_id && menu.id === params?.menu_id
  );

  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      item,
    },

    // revalidate: 900,
  };
};
