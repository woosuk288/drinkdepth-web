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

const CafePage: NextPage<Props> = ({ cafe, menus }) => {
  const metaData = {
    title: `카페 소개 및 메뉴 | ${cafe.name}`,
    description: cafe.introduce,
    image: cafe.imageURL,
    canonical: `${CAFE_PATH}/${cafe.id}`,
  };

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
