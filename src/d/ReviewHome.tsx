import { useInfiniteQuery, useQuery } from 'react-query';
import { FETCH_REVIEWS_KEY, FETCH_REVIEW_COUNT_KEY } from 'src/utils/queryKeys';
import { fetchReviewCount, fetchReviews } from 'src/firebase/services';
import { LinearProgress } from '@mui/material';
import Review from './Review';
import { useFirestore } from 'reactfire';

function ReviewHome() {
  const db = useFirestore();
  const { data: postCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_REVIEW_COUNT_KEY,
    () => fetchReviewCount(db)
  );
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_REVIEWS_KEY,
      ({ pageParam = new Date().toISOString() }) => {
        return fetchReviews(db, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            allPages.flat().length < postCount &&
            new Date(lastPage[lastPage.length - 1].createdAt).toISOString()
          );
        },
        // enabled: ''
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;

  return (
    <div css={{ '& > a': { marginBottom: '0.125rem', display: 'block' } }}>
      {/* <div css={{ padding: '1rem' }}>
        필터 영역
        <span> - 카페이름</span>
        <span> - 메뉴이름</span>
      </div> */}

      {testData.map((review) => (
        <Review key={review.id} review={review} />
      ))}
      {data?.pages.map((reviews) =>
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </div>
  );
}
export default ReviewHome;

const testData: CafeMenuReviewType[] = [
  {
    id: '1',
    // @ts-ignore
    place: {
      place_name: '스타벅스 스타필드고양1F R점',
    },
    menuName: '콜롬비아 세로 아줄 게이샤',
    type: 'filtered_coffee',
    coffee: {
      flavors: ['파인애플', '망고', '사이폰추출'],
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1623679652939-b5b216a709ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3RhcmJ1Y2tzJTIwcmVzZXJ2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        name: '콜롬비아 세로아줄',
        objectFit: 'cover',
        rotate: 0,
      },
    ],
    uid: 'aaa',
    displayName: '리저브샷추가',
    photoURL:
      'https://images.unsplash.com/photo-1606697513705-11653cd11ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RhcmJ1Y2tzJTIwcmVzZXJ2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    createdAt: new Date(),
    text: '한모금 마시는데 상콤한 과일향이 나면서 바디감있는 무거운느낌이 갠적으로 나쁘지 않더라그유~ \n 딸기케익이랑 함께해도 좋았지만 함께나오는 리저브 전용 비스코티랑 함께해도 너무 맛있었네여.',
    rating: 3,
    keywords: ['친절한 파트너', '개비쌈', '비스코티추천'],
  },
  {
    id: '2',
    // @ts-ignore
    place: {
      place_name: '탁이로스터리',
    },
    menuName: '꼰대라떼',
    type: 'coffee_drink',
    coffee: {
      flavors: ['막걸리', '식초단', '무알콜'],
    },
    images: [
      {
        url: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220527_155%2F1653632142368nzvef_JPEG%2F738379F7-1E62-4228-A627-DE5A950BFDB7.jpeg',
        name: '무이라떼',
        objectFit: 'cover',
        rotate: 0,
      },
    ],
    uid: 'bbb',
    displayName: '탁한식초',
    photoURL:
      'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220302_280%2F1646217092393X0akw_JPEG%2F31C80F05-3E85-417E-A1B6-4CF2252B0B69.jpeg',
    createdAt: new Date(),
    text: '커피에서 막걸리맛이 난다길래 넘 궁금해서 먹으러 가봤어요. 막걸리 향이랑 살짝 나는데 조금만 더 강했으면 하는 아쉬움이 ㅋㅋ',
    rating: 3,
    keywords: ['테스트', '연예인카페', '주말복잡'],
  },
  {
    id: '3',
    // @ts-ignore
    place: {
      place_name: '센터커피 서울숲점',
    },
    menuName: '콜롬비아 그란자 라 에스파란자 세로 아줄 게이샤 허니',
    type: 'filtered_coffee',
    coffee: {
      flavors: ['샤인머스켓', '멜론', '청사과'],
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwZmxhdm9yJTIwbm90ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        name: '콜롬비아 세로아줄',
        objectFit: 'cover',
        rotate: 0,
      },
    ],
    uid: 'aaa',
    displayName: '게이샤는에티',
    photoURL:
      'https://images.unsplash.com/photo-1518081692809-d68867210ca9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNlbnRlciUyMGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    createdAt: new Date(),
    text: `날은 춥고 새로 산 모직 자켓은 얇아서 따뜻한 커피를 시켰는데 세로 아줄 게이샤는 확실히 따뜻한 커피가 더 잘 어울리는 것 같다. '샤인 머스캣, 멜론, 청사과' 라는 아로마 노트 답게 초록초록한 단맛과 청량함이 있다.

    ​

    산미도 생각보다 강하지 않은 편. 입에 침이 도는 산미보다는 단맛 나는 과일의 숨김맛 산미 같은 느낌이었다.

    ​

    10년 전의 산미가 툭 치고 나오던 파나마 에스메랄다 게이샤와 달리 요즘 게이샤는 참 세련됐다. 가공법이 허니라 더 그런가. 센터커피 서울숲점의 경관과도 잘 어울리는 커피였다.`,
    rating: 5,
    keywords: ['콘센트많음', '사람도많음', '2층 창가 추천', '힐링'],
  },
  {
    id: '4',
    // @ts-ignore
    place: {
      place_name: '일프로커피',
    },
    menuName: '과테말라 아카테낭고 SHB EP Fancy',
    type: 'filtered_coffee',
    coffee: {
      flavors: ['버터', '코코아', '건포도'],
    },
    images: [
      {
        url: 'https://image.idus.com/image/files/9ccc8c9ac74c45e5b62b19025b36f784_720.jpg',
        name: '일프로',
        objectFit: 'cover',
        rotate: 0,
      },
    ],
    uid: 'aaa',
    displayName: '탄수',
    photoURL:
      'https://images.unsplash.com/photo-1502030818212-8601501607a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    createdAt: new Date(),
    text: '맛은 깔끔하고 쓰지 않으며 향이 좋아 마시기 좋았어요~ 연한 커피좋아하고 깔끔한거 좋아하시는 분들께 강추예요',
    rating: 4,
    keywords: ['가성비갑', '파란색간판', '크림치즈팥빵'],
  },
];
