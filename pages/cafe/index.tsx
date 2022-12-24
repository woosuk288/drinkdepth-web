import { Container } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { apiCafe, fetchCafes } from 'src/firebase/api';
import { CAFE_PATH } from 'src/utils/routes';
import Cafe from '../../src/cafe/Cafe';
import Meta from '../../src/common/Meta';

const metaData = {
  title: '깊이를 마시다 | 인기 추천 카페',
  description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
  image: '/images/logo_icon.png',
  canonical: `${CAFE_PATH}`,
};

const CafesPage: NextPage<Props> = ({ cafes }) => {
  return (
    <>
      <Meta data={metaData} />
      <Container maxWidth="sm" disableGutters>
        {cafes.map((cafe) => (
          <Cafe key={cafe.id} cafe={cafe} />
        ))}
      </Container>
    </>
  );
};
export default CafesPage;

type Props = {
  cafes: CafeType[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  // const cafes = await fetchCafes();

  let cafes;

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    cafes = await apiCafe.cache.list();
    if (!cafes) {
      cafes = await apiCafe.list();
      await apiCafe.cache.set(cafes);
    }
  } else {
    cafes = await fetchCafes();
  }

  if (!cafes || !Array.isArray(cafes)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cafes,
    },
    revalidate: 1800,
  };
};
