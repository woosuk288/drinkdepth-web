import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import { NextLinkComposed } from 'src/common/Link';
import { D_REVIEW_PATH } from 'src/utils/routes';
import Main from 'src/d/Main';
import ReviewForm from 'src/d/ReviewForm';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  cafeMenuReviewState,
  defaultCafeMenuReview,
} from 'atoms/reviewFormAtom';
import { useMutation } from 'react-query';
import { editReview, fetchProfile } from 'src/firebase/services';
import { useFirestore, useStorage, useUser } from 'reactfire';

const ReviewEditPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: user } = useUser();
  const db = useFirestore();
  const storage = useStorage();

  const [review, setReview] = useRecoilState(cafeMenuReviewState);

  React.useEffect(() => {
    setReview(() => JSON.parse(router.query.review as string));
  }, [router.query.review, setReview]);

  const { mutate, isLoading, isSuccess } = useMutation(editReview, {
    onSuccess: (nextReview) => {
      router
        .replace(`${D_REVIEW_PATH}/${id}`)
        .then(() => setReview(defaultCafeMenuReview));
    },
    onError(error: any) {
      console.log('error.code : ', error.code);
      console.log('error.message : ', error.message);
    },
  });

  const handleSubmit = async () => {
    if (user && (router.query.review as string) !== JSON.stringify(review)) {
      const profile = await fetchProfile(db, user.uid);

      mutate({
        db,
        storage,
        ...review,
        profile: {
          displayName: user.displayName ?? '',
          uid: user.uid,
          photoURL: user.photoURL ?? '',
          badgeIds: profile?.badgeIds ?? [],
        },
      });
    } else {
      router
        .replace(`${D_REVIEW_PATH}/${id}`)
        .then(() => setReview(defaultCafeMenuReview));
    }

    // router.replace(REVIEW_PATH);
  };

  const isValid = review.menuName && review.place && review.type;

  return (
    <>
      <NextSeo title="리뷰 수정 | 어떤 카페" />
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
              disabled={isSuccess || isLoading || !isValid}
            >
              수정완료
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

export default ReviewEditPage;
