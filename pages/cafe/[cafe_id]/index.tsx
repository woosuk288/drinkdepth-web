import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { testCafes } from '..';
import CafeHeader from '../../../src/cafe/Header';
import Intro from '../../../src/cafe/Intro';
import Menus from '../../../src/cafe/Menus';
import { AuthUserProvider } from '../../../src/context/AuthUserContext';
import { CafePageProps } from '../../../src/utils/types';

const CafePage: NextPage<CafePageProps> = ({ cafeIntro, cafeMenus }) => {
  return (
    <Container maxWidth="sm" disableGutters>
      {/* TODO: meta 넣기 */}
      <AuthUserProvider>
        <CafeHeader title={cafeIntro.name} />
        <Intro cafeIntro={cafeIntro} />
        <Menus cafeMenus={cafeMenus} />
      </AuthUserProvider>
    </Container>
  );
};
export default CafePage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: testCafes.map((cafe) => ({
      params: {
        cafe_id: cafe.id,
        name: cafe.name,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cafe = testCafes.find((testCafe) => testCafe.id === params?.cafe_id);

  if (!cafe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cafeIntro: cafe,
      cafeMenus,
    },

    // revalidate: 900,
  };
};

export const cafeMenus = [
  {
    cafeId: '1',
    id: '1',
    name: '에스프레소',
    description: '',
    labels: ['다크로스팅', '산미보통'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '2',
    name: '아메리카노',
    description: '',
    labels: ['다크로스팅', '산미보통'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '3',
    name: '카페라떼',
    description: '',
    labels: ['다크로스팅', '산미보통', '부드러운', '우유'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '4',
    name: '디카프리오',
    description: '',
    labels: ['디카페인', '조청', '유과', '고소', '부드러운'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '5',
    name: '디카프.오레',
    description: '',
    labels: ['디카프리오', '우유'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '6',
    name: '하이로 게샤',
    description: '',
    labels: ['얼그레이', '민트', '자스민', '오렌지 껍질 향'],
    imageURL:
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzEyfHxjb2ZmZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 10000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '7',
    name: '브릴리',
    description: '',
    labels: ['바닐라', '피넛 브리틀', '크림 브륄레', '누룽지 사탕'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 7000,
    category: '커피',
  },
  {
    cafeId: '1',
    id: '8',
    name: '허니 라벤더 티',
    description:
      '농축과 고밀도 정제과정을 거치지 않은 진짜 꿀, 로우허니에 절인 라벤더 꽃잎차',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5000,
    category: '차',
  },
  {
    cafeId: '1',
    id: '9',
    name: '콤부차',
    description: '',
    labels: ['발효', '탄산', '새콤달콤'],
    imageURL:
      'https://images.unsplash.com/photo-1547149617-609fafa00a6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHRlYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5000,
    category: '차',
  },
  {
    cafeId: '1',
    id: '10',
    name: '쿠키.다이제스티브',
    description: '',
    labels: [
      '유기농 귀리',
      '유기농 통밀',
      '유기농 밀가루',
      '유기농 설탕',
      '프랑스 다크 초콜릿',
    ],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 4000,
    category: '디저트',
  },
];
