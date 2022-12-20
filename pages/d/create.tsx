import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import { NextLinkComposed } from 'src/common/Link';
import { REVIEW_PATH } from 'src/utils/routes';
import Main from 'src/d/Main';
import ReviewForm from 'src/d/ReviewForm';
import { useRecoilState } from 'recoil';
import {
  cafeMenuReviewState,
  defaultCafeMenuReview,
} from 'atoms/reviewFormAtom';
import { useMutation } from 'react-query';
import { auth, createReview } from 'src/firebase/services';

const CreatePage: NextPage = () => {
  const router = useRouter();
  const user = auth.currentUser;

  const [review, setReview] = useRecoilState(cafeMenuReviewState);

  const { mutate, isLoading } = useMutation(createReview, {
    onSuccess: (newReview) => {
      router
        .replace(`${REVIEW_PATH}/${newReview.id}`)
        .then(() => setReview(defaultCafeMenuReview));
    },
    onError(error: any) {
      console.log('error.code : ', error.code);
      console.log('error.message : ', error.message);
    },
  });

  const handleSubmit = () => {
    // console.log('review : ', review);
    if (user) {
      mutate({
        ...review,
        displayName: user.displayName ?? '',
        uid: user?.uid,
        photoURL: user.photoURL ?? '',
      });
    }
    // router.replace(REVIEW_PATH);
  };

  const isValid = review.place && review.coffee && review.type;

  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 생성" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={
            <Typography fontWeight={'bold'}>
              {review.place?.place_name}
            </Typography>
          }
          rightIcon={
            <Button
              sx={{
                fontSize: 16,
                fontWeight: 600,
                padding: 0,
                marginLeft: '0.75rem',
                minWidth: '36px',
                width: '36px',
                lineHeight: '1.2rem',
              }}
              onClick={handleSubmit}
              disabled={isLoading || !isValid}
            >
              생성완료
            </Button>
          }
        />

        <Main>
          {isLoading && <LinearProgress />}
          <ReviewForm />
        </Main>
      </AuthContainer>
    </>
  );
};

export default CreatePage;
