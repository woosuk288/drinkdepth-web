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
import { useInfiniteQuery, useQuery } from 'react-query';
import { fetchMyReviewCount, fetchMyReviews } from 'src/firebase/services';
import {
  FETCH_MY_REVIEWS_KEY,
  FETCH_MY_REVIEW_COUNT_KEY,
} from 'src/utils/queryKeys';
import Review from 'src/d/Review';
// import { MYREVIEW_PATH, PLACE_PATH } from 'src/utils/routes';
import { useFirestore } from 'reactfire';
import FetchMoreButton from 'src/d/FetchMoreButton';

const MyReviewPage: NextPage = () => {
  const router = useRouter();
  const uid = router.query.uid as string;

  const handlePlaceIconClick = () => {
    alert('준비중입니다.');
    // const pathname = router.asPath.replace(MYREVIEW_PATH, PLACE_PATH);

    // router.push({ pathname, query: { uid } }, pathname);
  };

  return (
    <>
      <NextSeo title="DrinkDepth | 작성한 리뷰" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={
            <Typography fontWeight={'bold'}>작성한 리뷰</Typography>
          }
          rightIcon={
            <IconButton onClick={handlePlaceIconClick}>
              <PlaceIcon />
            </IconButton>
          }
        />

        <Main>
          <MyReviewContainer />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default MyReviewPage;

function MyReviewContainer() {
  const router = useRouter();
  const uid = router.query.profile_id as string;
  const db = useFirestore();

  const { data: reviewCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_MY_REVIEW_COUNT_KEY,
    () => fetchMyReviewCount(db, uid),
    { enabled: !!uid }
  );

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_MY_REVIEWS_KEY,
      ({ pageParam = new Date().toISOString() }) => {
        return fetchMyReviews(db, uid, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            allPages.flat().length < reviewCount &&
            new Date(lastPage[lastPage.length - 1].createdAt).toISOString()
          );
        },
        enabled: !!uid,
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;
  if (!uid) return null;

  return (
    <>
      <div css={{ '& > div': { marginBottom: '0.125rem' } }}>
        {data?.pages.map((reviews) =>
          reviews.map((review) => (
            <Review key={review.id} review={review} uid={uid} />
          ))
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
