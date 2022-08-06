import { Container } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import Meta from '../../src/common/Meta';
import { CafesPageProps } from '../../src/utils/types';

const metaData = {
  title: '깊이를 마시다 | 인기 추천 카페',
  description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
  image: '/images/logo_icon.png',
  canonical: 'cafe/landing',
};

const CafesPage: NextPage<CafesPageProps> = ({ cafes }) => {
  return (
    <>
      <Meta data={metaData} />
      <Container maxWidth="sm" disableGutters>
        {cafes.map((cafe) => (
          <li key={cafe.id}>{cafe.name}</li>
        ))}
      </Container>
    </>
  );
};
export default CafesPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      cafes: testCafes,
    },
    revalidate: 1800,
  };
};

export const testCafes = [
  {
    id: '1',
    name: '나무사이로 종로',
    introduce:
      '2002년 서울에서 시작한 나무사이로는 한 잔의 커피로 우리의 일상이           풍요로워지기를 바랍니다. 지속적으로 산지를 방문하여 농부•생산업자와           소통하며 좋은 재료와 논리적인 로스팅, 철저한 품질관리를 기반으로           커피가 가진 다양한 매력을 소개합니다.',
    address: '서울 종로구 사직로8길 21',
    addressY: '37.5746665386618',
    addressX: '126.970971159569',
    addressETC: '3호선 경복궁역 7번 출구에서273m',
  },
];
