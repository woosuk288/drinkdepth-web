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
    id: 'babacarmel',
    name: '바바카멜',
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211021_259%2F1634788006349s8KvS_JPEG%2FKakaoTalk_20211020_181656262.jpg',
    introduce: `※ 카페 바바카멜은 안산 플라워&로스터리 카페입니다.
      엄선된 생두와 특별한 공법으로 로스팅한 바바카멜만의 싱글오리진 원두로 내린 필터커피와 제대로 된 에스프레소를 즐겨보세요.

      ※ 그동안 쉽게 맛보기 힘들었던 두종류의 게이샤 커피를 처음으로 선보입니다.

      ※ 애견동반은 테라스(도그파킹) 이용은 언제든 가능하며, 유모차나 케이지, 슬링백안에 있을 경우 매장 이용도 가능합니다. 단, 매장안에 내려놓으시면 안됩니다.

      ※꽃바구니나 꽃다발 예약 가능하며, 매장내에서 소량의 꽃 구입도 가능합니다. 손님이 많으실 경우 포장에 조금 시간이 걸릴 수 있으니 미리 예약하시기를 권장합니다.

      ※주차는 매장 건너편 무료 공원주차장을 이용하시거나, 매장 뒷편 이면도로와 공원옆 이면도로 주차장을 이용하시면 됩니다.

      ※매장 뿐 아니라 온라인에서도 꽃과 커피의 향미를 통해 지친 현대인에게 느려도 되는 순간들, 여유로운 순간들을 지켜주는 존재로 일상의 행복을 담아 보냅니다.`,
    address: '경기 안산시 상록구 충장로 8 1층',
    addressY: '37.2825273384935',
    addressX: '126.855799779277',
    addressETC: '',
    // addressETC: '3호선 경복궁역 7번 출구에서273m',
  },
];
