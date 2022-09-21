import {
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { NextPage } from 'next';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query';
import MenuReviewAll from '../../../../../src/cafe/MenuReviewAll';
import HeaderCustom from '../../../../../src/common/HeaderCustom';
import {
  deleteMenuReview,
  fetchCafeMenuReviews,
} from '../../../../../src/utils/firebase/services';
import { Props } from '../[menu_id]';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const metaData = {
//   title: '깊이를 마시다 | 인기 추천 카페',
//   description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
//   image: '/images/logo_icon.png',
//   canonical: 'cafe/landing',
// };

const REVIEW_ALL = 'REVIEW_ALL';

const ReviewsPage: NextPage<Props> = ({ menu }) => {
  const LIMIT = 15;
  const { cafeId, id: menuId } = menu;
  const queryClient = useQueryClient();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      REVIEW_ALL,
      ({ pageParam }) => fetchCafeMenuReviews(cafeId, menuId, LIMIT, pageParam),
      {
        getNextPageParam: (lastPage, allPages) =>
          lastPage.length === LIMIT && lastPage[lastPage.length - 1].createdAt,
      }
    );

  const { mutate: deleteReviewMutate } = useMutation(deleteMenuReview, {
    onSuccess: (_, { reviewId }) => {
      const nextData: InfiniteData<ReviewType[]> = {
        ...data!,
        pages: data!.pages.map((page) =>
          page.filter((review) => review.id !== reviewId)
        ),
      };

      queryClient.setQueryData(REVIEW_ALL, nextData);
    },
  });

  const handleDeleteReview = (reviewId: string) => {
    deleteReviewMutate({ cafeId, menuId, reviewId });
  };

  if (status === 'loading') return <LinearProgress />;

  if (!data) return null;

  return (
    <>
      {/* <Meta data={metaData} /> */}
      <Container maxWidth="sm" disableGutters>
        <HeaderCustom leftIcon="back" centerComponent={'리뷰'} />

        <MenuReviewAll data={data} handleDeleteReview={handleDeleteReview} />

        {hasNextPage && (
          <div style={{ textAlign: 'center' }}>
            {isFetchingNextPage ? (
              <CircularProgress />
            ) : (
              <IconButton size="small" onClick={() => fetchNextPage()}>
                <ExpandMoreIcon fontSize="large" />
              </IconButton>
            )}
          </div>
        )}
      </Container>
    </>
  );
};
export default ReviewsPage;

export { getStaticPaths, getStaticProps } from '../[menu_id]';
