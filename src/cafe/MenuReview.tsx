import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';

import MoodIcon from '@mui/icons-material/Mood';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addMenuReview,
  DB_REVIEWS,
  deleteMenuReview,
  fetchCafeMenuReviews,
} from '../utils/firebase/services';
import { useRouter } from 'next/router';
import { REVIEWS_PATH } from '../utils/routes';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const SLICE_COUNT = 3;

type MenuReviewProps = {
  cafeId: string;
  menuId: string;
  reviewCount: number;
};

function MenuReview({ cafeId, menuId, reviewCount }: MenuReviewProps) {
  const router = useRouter();
  const [review, setComment] = useState('');
  const queryClient = useQueryClient();
  const [count, setCount] = useState(reviewCount);
  const { user } = useFirebaseAuth();

  const { isLoading: isLoadingReviews, data: reviews } = useQuery(
    DB_REVIEWS,
    () => fetchCafeMenuReviews(cafeId, menuId, 3, new Date()),
    {
      onSuccess: (data) => {
        console.log('reviews : ', data);
      },
    }
  );
  const { mutate: addReviewMutate, isLoading: isAddingReview } = useMutation(
    addMenuReview,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(DB_REVIEWS);
        setCount((prev) => prev + 1);
      },
    }
  );

  const { mutate: deleteReviewMutate } = useMutation(deleteMenuReview, {
    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries(DB_REVIEWS);
      setCount((prev) => prev - 1);
    },
  });

  const handleAddReview = () => {
    addReviewMutate(
      { cafeId, menuId, review },
      { onSuccess: () => setComment('') }
    );
  };

  const handleDeleteReview = (reviewId: string) => {
    deleteReviewMutate({ cafeId, menuId, reviewId });
  };

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ marginBottom: '2rem' }}
      >
        고객 리뷰
      </Typography>
      <List>
        {/* Review */}

        {isLoadingReviews ? (
          <ListItem sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </ListItem>
        ) : !reviews || reviews.length === 0 ? (
          <Typography
            // fontWeight="bold"
            align="center"
            color="GrayText"
            sx={{ marginBottom: '2rem' }}
          >
            고객님이 첫 번째 리뷰를 등록하세요.
          </Typography>
        ) : (
          reviews?.slice(0, SLICE_COUNT).map((review) => (
            <ListItem key={review.id}>
              <Typography
                fontWeight="bold"
                component="span"
                sx={{ marginRight: '1rem' }}
              >
                {review.displayName.charAt(0) + '**'}
              </Typography>
              <Typography sx={{ flex: 1 }} noWrap>
                {review.text}
              </Typography>

              {user?.uid === review.uid && (
                <IconButton
                  size="small"
                  onClick={() => handleDeleteReview(review.id!)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </ListItem>
          ))
        )}

        {count > SLICE_COUNT && (
          <ListItem
            onClick={() => router.push(`${router.asPath}${REVIEWS_PATH}`)}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ cursor: 'pointer' }}
            >
              리뷰 {count}개 모두 보기
            </Typography>
          </ListItem>
        )}
      </List>

      {/* TextField */}
      <TextField
        disabled={!user}
        autoComplete="off"
        sx={{ paddingLeft: '1rem', paddingY: '0.5rem' }}
        placeholder={user ? '리뷰 달기...' : '로그인 후 가능합니다.'}
        fullWidth
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoodIcon fontSize="large" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                sx={{ fontWeight: 'bold' }}
                onClick={handleAddReview}
                disabled={review.length < 1 || isAddingReview}
              >
                게시
              </Button>
            </InputAdornment>
          ),

          disableUnderline: true,
        }}
        value={review}
        onChange={(e) => setComment(e.target.value)}
      />
    </>
  );
}
export default MenuReview;
