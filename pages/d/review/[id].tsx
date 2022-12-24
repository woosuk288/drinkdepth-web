import * as React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ReviewDetail from 'src/d/ReviewDetail';
import { useRecoilValue } from 'recoil';
import { cafeMenuReviewState } from 'atoms/reviewFormAtom';
import RedirectPage from 'src/common/RedirectPage';
import { NOT_FOUND_PATH } from 'src/utils/routes';
import { useMutation, useQuery } from 'react-query';
import { FETCH_REVIEW_KEY } from 'src/utils/queryKeys';
import { useRouter } from 'next/router';
import { deleteReview, fetchReview } from 'src/firebase/services';
import { IconButton, LinearProgress } from '@mui/material';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useFirestore, useStorage, useUser } from 'reactfire';

const ReviewDetailPage: NextPage = () => {
  const [bookmark, setBookmark] = React.useState(false);

  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 상세" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={'리뷰 상세'}
          rightIcon={
            <IconButton
              color="inherit"
              onClick={() => setBookmark((prev) => !prev)}
            >
              {bookmark ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
            </IconButton>
          }
        />

        <Main>
          <ReviewDetailContainer />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default ReviewDetailPage;

function ReviewDetailContainer() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: user } = useUser();
  const db = useFirestore();
  const storage = useStorage();

  const { data, isLoading, error } = useQuery(
    FETCH_REVIEW_KEY(id),
    () => fetchReview(db, id),
    { enabled: !!id }
  );

  const deleteMutation = useMutation(deleteReview, {
    onSuccess: () => {
      router.back();
    },
  });

  const handleReviewDelete = () => {
    if (user && confirm('삭제하시겠어요?')) {
      deleteMutation.mutate({ db, storage, reviewId: id, uid: user.uid });
    }
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>오류 발생!</div>;
  if (!id || !data) return <RedirectPage path={NOT_FOUND_PATH} />;

  return (
    <ReviewDetail
      review={data}
      userId={user?.uid}
      handleReviewDelete={handleReviewDelete}
    />
  );
}
