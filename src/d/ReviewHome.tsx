import { useInfiniteQuery, useQuery } from 'react-query';
import { FETCH_REVIEWS_KEY, FETCH_REVIEW_COUNT_KEY } from 'src/utils/queryKeys';
import { fetchReviewCount, fetchReviews } from 'src/firebase/services';
import { LinearProgress } from '@mui/material';
import Review from './Review';
import { useFirestore } from 'reactfire';
import FetchMoreButton from './FetchMoreButton';

function ReviewHome() {
  const db = useFirestore();
  const { data: reviewCount = 0, isLoading: isLoadingCount } = useQuery(
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
            allPages.flat().length < reviewCount &&
            new Date(lastPage[lastPage.length - 1].createdAt).toISOString()
          );
        },
        enabled: reviewCount > 0,
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;

  return (
    <>
      <div css={{ '& > div': { marginBottom: '0.125rem' } }}>
        {/* <div css={{ padding: '1rem' }}>
        필터 영역
        <span> - 카페이름</span>
        <span> - 메뉴이름</span>
      </div> */}

        {data?.pages.map((reviews) =>
          reviews.map((review) => <Review key={review.id} review={review} />)
        )}
      </div>
      <div css={{ margin: '0.5rem 0' }}>
        {hasNextPage && (
          <FetchMoreButton
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </>
  );
}
export default ReviewHome;
