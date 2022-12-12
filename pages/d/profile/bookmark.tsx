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
import ReviewDetailList from 'src/d/ReviewDetailList';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  auth,
  fetchMyReviewCount,
  fetchMyReviews,
} from 'src/firebase/services';
import {
  FETCH_MY_REVIEWS_KEY,
  FETCH_MY_REVIEW_COUNT_KEY,
} from 'src/utils/queryKeys';

const BookmarkReviewPage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 찜한 리뷰" />
      <AuthContainer>
        <HeaderD leftIcon="back" centerComponent={'찜한 리뷰'} />

        <Main>찜{/* <BookmarkReviewContainer /> */}</Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default BookmarkReviewPage;

function BookmarkReviewContainer() {
  const user = auth.currentUser!;
  // const router = useRouter();

  const { data: postCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_MY_REVIEW_COUNT_KEY,
    () => fetchMyReviewCount(user.uid)
  );
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_MY_REVIEWS_KEY,
      ({ pageParam = new Date() }) => {
        return fetchMyReviews(user.uid, pageParam);
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

  return <ReviewDetailList infiniteReviews={data} />;
}
