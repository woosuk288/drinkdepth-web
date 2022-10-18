import { Container } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { CAFE_PATH } from 'src/utils/routes';
import Cafe from '../../src/cafe/Cafe';
import Meta from '../../src/common/Meta';
import { fetchCafes } from '../../src/firebase/services';

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
  const cafes = await fetchCafes();

  return {
    props: {
      cafes,
    },
    revalidate: 1800,
  };
};
