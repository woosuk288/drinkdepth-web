import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import MenuReviewAll from '../../../../../src/cafe/MenuReviewAll';
import HeaderCustom from '../../../../../src/common/HeaderCustom';
import { fetchAllMenus } from '../../../../../src/utils/firebase/services';

// const metaData = {
//   title: '깊이를 마시다 | 인기 추천 카페',
//   description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
//   image: '/images/logo_icon.png',
//   canonical: 'cafe/landing',
// };

const ReviewsPage: NextPage<Props> = ({ reviews }) => {
  return (
    <>
      {/* <Meta data={metaData} /> */}
      <Container maxWidth="sm" disableGutters>
        <HeaderCustom leftIcon="back" centerComponent={'리뷰'} />
        <MenuReviewAll reviews={reviews} hasMore={false} />
      </Container>
    </>
  );
};
export default ReviewsPage;

type Props = {
  reviews: ReviewType[];
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

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  // fetchCafeMenu()

  const reviews: ReviewType[] = Array.from({ length: 15 }, (_, i) => ({
    id: 'id' + i,
    displayName: 'test' + i,
    photoURL: '',
    text: 'adfsda' + i,
    uid: 'kakao:2336824408',
    createdAt: new Date().toISOString(),
  }));

  return {
    props: {
      reviews,
    },
  };
};
