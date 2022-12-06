import { InfiniteData } from 'react-query';
import ReviewDetail from './ReviewDetail';

type Props = {
  infiniteReviews: InfiniteData<CafeMenuReviewType[]> | undefined;
};
function ReviewDetailList({ infiniteReviews }: Props) {
  // <ReviewDetail review={review} />
  return (
    <div css={{ '& > div': { marginBottom: '1rem' } }}>
      {infiniteReviews?.pages.map((reviews) =>
        reviews.map((review) => (
          <ReviewDetail key={review.id} review={review} />
        ))
      )}
    </div>
  );
}
export default ReviewDetailList;
