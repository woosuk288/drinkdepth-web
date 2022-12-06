import { useInfiniteQuery, useQuery } from 'react-query';
import { FETCH_REVIEWS_KEY, FETCH_REVIEW_COUNT_KEY } from 'src/utils/queryKeys';
import { fetchReviewCount, fetchReviews } from 'src/firebase/services';
import { LinearProgress } from '@mui/material';
import Review from './Review';

function ReviewHome() {
  const { data: postCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_REVIEW_COUNT_KEY,
    () => fetchReviewCount()
  );
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_REVIEWS_KEY,
      ({ pageParam = new Date() }) => {
        return fetchReviews(pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            allPages.flat().length < postCount &&
            new Date(lastPage[lastPage.length - 1].createdAt)
          );
        },
        // enabled: ''
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;

  return (
    <div css={{ '& > a': { marginBottom: '1.25rem', display: 'block' } }}>
      {/* <div css={{ padding: '1rem' }}>
        필터 영역
        <span> - 카페이름</span>
        <span> - 메뉴이름</span>
      </div> */}

      {data?.pages.map((reviews) =>
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </div>
  );
}
export default ReviewHome;

const data = [
  {
    id: 'aaaaa1',
    uid: '123',
    displayName: '옥상농부',
    createdAt: new Date(),
    cafeName: '바바카멜',
    menuName: '에티오피아 하로 게샤',
    coffee: {
      rating: 5,
      flavors: ['딸기', '아몬드', '초콜릿'],
    },
    keywords: ['벽난로', '플라워카페', '일하기좋음'],
    text: `처음 마셧을때 커피 보다 티?를 마시는 느낌이었습니다.
      약간 아카시아 꿀 같은 느낌 부담없이 꿀꺽마실 수있고 뒷맛에 설탕넣은 듯 단맛이 너무 좋습니다 식었을때 부터 나오는 베르가못향과 베리류 산미도 좋게 마셨습니다`,
  },
  {
    id: 'aaaaa2',
    uid: '1234',
    displayName: '동네주민',
    createdAt: new Date(),
    cafeName: '센터커피',
    menuName: '과테말라 스타라이트',
    coffee: {
      rating: 4,
      flavors: ['와인', '오렌지', '블랙베리'],
    },
    keywords: ['뷰가 예술', '주차공간 없음', '인테리어 이쁨'],
    text: '숲에 있어서 그런지 공기가 너무 좋고 힐링하구 왔어요! 커피는 와인이랑 오렌지 맛이 강하게나서 그런지 산미가 확실히 느껴지네요. 상당히 괜찮습니다. 다만 가격이 비싸다는게 흠.',
  },
  {
    id: 'aaaaa#',
    uid: '1235',
    displayName: '커피유공자',
    createdAt: new Date(),
    cafeName: '브니엘 커피로스터스',
    menuName: '케냐 AA 워시드',
    coffee: {
      rating: 3,
      flavors: ['복숭아', '자스민', '땅콩'],
    },
    keywords: ['다양한원두', '가성비대박', '카페쇼은상'],
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ea culpa libero odio et aut molestias nihil adipisci quos? Sequi culpa vero quae libero. Cupiditate quas fugit doloribus! Illo, nostrum?',
  },
];
