import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Profile from 'src/d/Profile';
import Navbar from 'src/d/Navbar';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { fetchMyReviewCount, fetchMyReviews } from 'src/firebase/services';
import {
  FETCH_MY_REVIEWS_KEY,
  FETCH_MY_REVIEW_COUNT_KEY,
} from 'src/utils/queryKeys';
import Review from 'src/d/Review';

const MyReviewPage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 작성한 리뷰" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={
            <Typography fontWeight={'bold'}>작성한 리뷰</Typography>
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
  const uid = router.query.uid as string;

  const { data: reviewCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_MY_REVIEW_COUNT_KEY,
    () => fetchMyReviewCount(uid),
    { enabled: !!uid }
  );
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_MY_REVIEWS_KEY,
      ({ pageParam = new Date() }) => {
        return fetchMyReviews(uid, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            allPages.flat().length < reviewCount &&
            new Date(lastPage[lastPage.length - 1].createdAt)
          );
        },
        enabled: !!uid,
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;
  if (!uid) return null;

  return (
    <div css={{ '& > a': { marginBottom: '0.125rem', display: 'block' } }}>
      {data?.pages.map((reviews) =>
        reviews.map((review) => <Review key={review.id} review={review} />)
      )}
    </div>
  );
}
