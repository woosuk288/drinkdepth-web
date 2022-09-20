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

const CafePage: NextPage<Props> = ({ cafe, menus }) => {
  const metaData = {
    title: `깊이를 마시다 | ${cafe.name}`,
    description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
    image: cafe.imageURL,
    canonical: `cafe/${cafe.id}`,
  };

  return (
    <Container maxWidth="sm" disableGutters>
      {/* TODO: meta 넣기 */}
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
