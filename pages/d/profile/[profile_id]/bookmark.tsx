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
import { useInfiniteQuery, useQuery } from 'react-query';
import { fetchMyReviewCount, fetchMyReviews } from 'src/firebase/services';
import {
  FETCH_MY_REVIEWS_KEY,
  FETCH_MY_REVIEW_COUNT_KEY,
} from 'src/utils/queryKeys';
import Review from 'src/d/Review';
import { useFirestore, useUser } from 'reactfire';
import { User } from 'firebase/auth';

const BookmarkReviewPage: NextPage = () => {
  const { data: user } = useUser();

  return (
    <>
      <NextSeo title="DrinkDepth | 찜한 리뷰" />
      <AuthContainer>
        <HeaderD leftIcon="back" centerComponent={'찜한 리뷰'} />

        <Main>찜{/* <BookmarkReviewContainer user={user} /> */}</Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default BookmarkReviewPage;

function BookmarkReviewContainer({ user }: { user: User }) {
  // const router = useRouter();
  const db = useFirestore();

  const { data: postCount = 0, isLoading: isLoadingCount } = useQuery(
    FETCH_MY_REVIEW_COUNT_KEY,
    () => fetchMyReviewCount(db, user.uid)
  );
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      FETCH_MY_REVIEWS_KEY,
      ({ pageParam = new Date().toISOString() }) => {
        return fetchMyReviews(db, user.uid, pageParam);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return (
            allPages.flat().length < postCount &&
            new Date(lastPage[lastPage.length - 1].createdAt).toISOString()
          );
        },
        // enabled: ''
      }
    );

  if (isLoadingCount || isLoading) return <LinearProgress />;

  <div css={{ '& > a': { marginBottom: '0.125rem', display: 'block' } }}>
    {data?.pages.map((reviews) =>
      reviews.map((review) => <Review key={review.id} review={review} />)
    )}
  </div>;
}
