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
import MenuReviewAll from 'src/cafe/MenuReviewAll';
import HeaderCustom from 'src/common/HeaderCustom';
import { deleteMenuReview, fetchCafeMenuReviews } from 'src/firebase/services';
import { Props } from '../[menu_id]';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Meta from 'src/common/Meta';
import { CAFE_PATH, MENU_PATH, REVIEWS_PATH } from 'src/utils/routes';
import { useFirestore } from 'reactfire';

const REVIEW_ALL = 'REVIEW_ALL';

const ReviewsPage: NextPage<Props> = ({ menu }) => {
  const metaData = {
    title: `메뉴 리뷰 | ${menu.name}`,
    description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
    image: '/images/logo_icon.png',
    canonical: `${CAFE_PATH}/${menu.cafeId}${MENU_PATH}/${menu.id}${REVIEWS_PATH}`,
  };

  const db = useFirestore();

  const LIMIT = 15;
  const { cafeId, id: menuId } = menu;
  const queryClient = useQueryClient();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      REVIEW_ALL,
      ({ pageParam = new Date().toISOString() }) => {
        return fetchCafeMenuReviews(db, cafeId, menuId, LIMIT, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            lastPage.length === LIMIT &&
            new Date(lastPage[lastPage.length - 1].createdAt).toISOString()
          );
        },
      }
    );

  const { mutate: deleteReviewMutate } = useMutation(deleteMenuReview, {
    onSuccess: (_, { reviewId }) => {
      const nextData: InfiniteData<B2BReviewType[]> = {
        ...data!,
        pages: data!.pages.map((page) =>
          page.filter((review) => review.id !== reviewId)
        ),
      };

      queryClient.setQueryData(REVIEW_ALL, nextData);
    },
  });

  const handleDeleteReview = (reviewId: string) => {
    deleteReviewMutate({ db, cafeId, menuId, reviewId });
  };

  if (status === 'loading') return <LinearProgress />;

  if (!data) return null;

  return (
    <Container maxWidth="sm" disableGutters>
      <Meta data={metaData} />
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
  );
};
export default ReviewsPage;

export { getStaticPaths, getStaticProps } from '../[menu_id]';
