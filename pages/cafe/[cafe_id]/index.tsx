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
    cafeId: 'babacarmel',
    id: 'babacarmel-1',
    name: '에티오피아 하로 게이샤',
    description:
      '열대 과일과 베리류의 향미와 단맛, 후미에 느껴지는 산뜻한 산미',
    labels: ['열대 과일', '베리류', '단맛', '산미'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-2',
    name: '에티오피아 베케 게이샤',
    description: '구운 견과류와 과일의 산미의 어우러짐, 균형잡힌 밸런스.',
    labels: ['구운 견과류', '과일', '산미', '밸런스'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-3',
    name: '케냐 AA 칭가 퀸',
    description: '포도주와 같은 산미와 깔끔함, 부드러운 목넘김과 풍부한 질감',
    labels: ['포도주', '산미', '깔끔', '부드러움'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-4',
    name: '파푸아뉴기니 마라와카 블루마운틴',
    description: '카라멜, 초콜릿의 단맛과 열대과일이 더해진 풍부한 아로마',
    labels: ['카라멜', '초콜릿', '단맛', '열대과일'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 6000,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-5',
    name: '에티오피아 아리차 G1',
    description: '농익은 열대과일의 단향, 새콤한 산미',
    labels: ['열대과일', '단맛', '산미'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-6',
    name: '에티오피아 코케 허니',
    description: '레드와인의 산미와 감칠맛, 복합적인 아로마와 꽃향',
    labels: ['레드와인', '산미', '꽃향'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-7',
    name: '에티오피아 코케 허니',
    description: '레드와인의 산미와 감칠맛, 복합적인 아로마와 꽃향',
    labels: ['레드와인', '산미', '꽃향'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-8',
    name: '콜롬비아 수프리모 디카페인',
    description: '살구의 아로마와 감칠맛, 에이드의 청량함과 카라멜의 단맛',
    labels: ['살구', '청량함', '카라멜', '단맛'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-9',
    name: '바바카멜 하우스 블렌드',
    description: '묵직한 바디감과 구운 견과류의 후미',
    labels: ['묵직한', '바디감', '구운 견과류'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 5500,
    category: '필터 커피',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-10',
    name: '필터커피 서버 세트',
    description: '600ml 서버에 한 종류의 필터커피를 담아드립니다.',
    labels: ['세트'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211022_29%2F1634862235144Uf8mf_JPEG%2FfnLVysOWSwIT1ZKOtBMoVlvR.jpeg.jpg',
    price: 10000,
    category: '필터 커피',
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-11',
    name: '자몽커피토닉',
    description: '상큼, 달달한 자몽청과 칭가퀸 커피가 어우러진 깔끔한 티',
    labels: ['자몽', '상큼', '단맛', '깔끔'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_46%2F1658476265855uy1sw_JPEG%2FKakaoTalk_20211113_130427102.jpg',
    price: 7500,
    category: '시그니처',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-12',
    name: '청귤커피토닉(시즌)',
    description: '시원한 청귤과 코케허니 커피가 어우리전 리프레쉬 티',
    labels: ['청귤', '코케허니'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 7500,
    category: '시그니처',
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-13',
    name: '에스프레소',
    description:
      '바바카멜만의 스페셜한 블랜딩 원두, 묵직한 바디감과 구운 견과류의 후미',
    labels: ['블랜딩', '묵직한', '구운 견과류'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 4500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-14',
    name: '아메리카노(HOT/ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_67%2F1658476150874DzrQ0_JPEG%2F%25BE%25C6%25B8%25DE%25B8%25AE%25C4%25AB%25B3%25EB.jpg',
    price: 4500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-15',
    name: '카페라떼',
    description: '',
    labels: [],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_52%2F1658476211679TOw1s_JPEG%2FKakaoTalk_20211109_205006166.jpg',
    price: 5000,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-16',
    name: '아이스크림 카페라떼(HOT/ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6900,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-17',
    name: '크림모카(HOT)',
    description: '진한 라떼와 초코, 바바카멜의 수제크림이 올라간 커피',
    labels: ['초코', '크림'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-18',
    name: '피넛스카치라떼(ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-19-1',
    name: '카페모카(HOT/ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-19-2',
    name: '카라멜 마끼아또(HOT/ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-20',
    name: '아포카토',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-20-1',
    name: '밀크 아인슈페너',
    description: '진한 아이스라떼와 수제크림의 조화로운 아인슈페너',
    labels: ['우유', '크림'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_234%2F1658476751275AHVyG_JPEG%2F%25B9%25D0%25C5%25A9_%25BE%25C6%25C0%25CE%25BD%25B4%25C6%25E4%25B3%25CA.jpg',
    price: 6500,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-20-2',
    name: '솔티 아인슈페너',
    description: '깔끔한 커피 + 수제크림의 단짠 조화',
    labels: ['우유', '크림', '단짠'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_227%2F1658476795138X2ISd_JPEG%2F%25BC%25D6%25C6%25BC_%25BE%25C6%25C0%25CE%25BD%25B4%25C6%25E4%25B3%25CA.jpg',
    price: 6000,
    category: '에스프레소',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-20-3',
    name: '얼그레이 아인슈페너',
    description: '진한 아이스라떼와 수제크림의 조화로운 아인슈페너',
    labels: ['얼그레이', '크림'],
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220722_85%2F1658476833390x89Sj_JPEG%2F%25BE%25F3%25B1%25D7%25B7%25B9%25C0%25CC%25BE%25C6%25C0%25CE%25BD%25B4%25C6%25E4%25B3%25CA.jpg',
    price: 6000,
    category: '에스프레소',
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-21',
    name: '에이드 (자몽/레몬/딸기레몬/백향)',
    description: '바바카멜이 정성껏 만든 수제청을 사용합니다.',
    labels: ['자몽', '레몬', '딸기레몬', '백향'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5500,
    category: '음료',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-22',
    name: '플라워 티 (목련/벚꽃/매화)',
    description: '',
    labels: ['목련', '벚꽃', '매화'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5000,
    category: '음료',
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-23',
    name: '딸기라떼(ICE ONLY)',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5500,
    category: '음료',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-24',
    name: '초코라뗴(HOT/ICE)',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 5000,
    category: '음료',
  },

  {
    cafeId: 'babacarmel',
    id: 'babacarmel-25',
    name: '베이글과 크림치즈',
    description: '',
    labels: [],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 4000,
    category: '디저트',
  },
  {
    cafeId: 'babacarmel',
    id: 'babacarmel-26',
    name: '바바 크로플',
    description: '겉바속촉 크로플과 아이스크림, 브라운 치즈의 치명정 단짠 조화',
    labels: ['겉바속촉', '아이스크림', '치즈', '단짠'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 8000,
    category: '디저트',
  },
];
