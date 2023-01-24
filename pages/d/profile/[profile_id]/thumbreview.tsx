import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { IconButton, LinearProgress, Typography } from '@mui/material';

import PlaceIcon from '@mui/icons-material/Place';

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import { useInfiniteQuery } from 'react-query';
import { fetchThumbReviews } from 'src/firebase/services';
import { FETCH_THUMB_REVIEWS_KEY } from 'src/utils/queryKeys';
import Review from 'src/d/Review';
// import { ThumbReview_PATH, PLACE_PATH } from 'src/utils/routes';
import { useFirestore } from 'reactfire';
import FetchMoreButton from 'src/d/FetchMoreButton';

const ThumbReviewPage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const handlePlaceIconClick = () => {
    alert('준비중입니다.');
    // const pathname = router.asPath.replace(ThumbReview_PATH, PLACE_PATH);

    // router.push({ pathname, query: { uid } }, pathname);
  };

  return (
    <>
      <NextSeo title="찜한 리뷰 | 어떤 카페" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={
            <Typography fontWeight={'bold'}>찜한 리뷰</Typography>
          }
          rightIcon={
            <IconButton onClick={handlePlaceIconClick}>
              <PlaceIcon />
            </IconButton>
          }
        />

        <Main>
          <ThumbReviewContainer />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default ThumbReviewPage;

const LIMIT = 15;
function ThumbReviewContainer() {
  const router = useRouter();
  const uid = router.query.profile_id as string;
  const db = useFirestore();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_THUMB_REVIEWS_KEY,
      ({ pageParam = new Date().toISOString() }) => {
        return fetchThumbReviews(db, uid, pageParam, LIMIT);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            lastPage.length === LIMIT &&
            lastPage[lastPage.length - 1]?.createdAt
          );
        },
        enabled: !!uid,
      }
    );

  if (isLoading) return <LinearProgress />;
  if (!uid) return null;

  return (
    <>
      <div css={{ '& > div': { marginBottom: '0.125rem' } }}>
        {data?.pages.map((reviews) =>
          reviews.map((review) =>
            review?.id ? (
              <Review key={review.id} review={review} uid={uid} />
            ) : (
              <div>리뷰가 존재하지 않습니다.</div>
            )
          )
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
