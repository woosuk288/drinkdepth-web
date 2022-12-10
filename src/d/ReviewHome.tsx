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
    <div css={{ '& > a': { marginBottom: '0.125rem', display: 'block' } }}>
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
