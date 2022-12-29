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
import { useRecoilState } from 'recoil';
import {
  cafeMenuReviewState,
  defaultCafeMenuReview,
} from 'atoms/reviewFormAtom';
import { useMutation } from 'react-query';
import {
  createReview,
  fetchProfile,
  giveEventBadge,
} from 'src/firebase/services';
import { useFirestore, useStorage, useUser } from 'reactfire';

const CreatePage: NextPage = () => {
  const router = useRouter();
  const { data: user } = useUser();
  const db = useFirestore();
  const storage = useStorage();

  const [review, setReview] = useRecoilState(cafeMenuReviewState);

  const { mutate, isLoading } = useMutation(createReview);

  const handleSubmit = async () => {
    if (!user || isLoading) return;

    const profile = await fetchProfile(db, user.uid);

    // console.log('review : ', review);
    if (user) {
      mutate(
        {
          db,
          storage,
          ...review,
          profile: {
            displayName: user.displayName ?? '',
            uid: user.uid,
            photoURL: user.photoURL ?? '',
            badgeIds: profile?.badgeIds ?? [],
          },
        },
        {
          async onSuccess(newReview, variables, context) {
            // TODO: 개국공신 배지 지급 | 추후 삭제
            // 리뷰를 생선한적이 있고, 해당 배지가 없을시 증정
            if (!profile?.badgeIds?.includes('00010')) {
              await giveEventBadge(db, user);
            }
            router
              .replace(`${D_REVIEW_PATH}/${newReview.id}`)
              .then(() => setReview(defaultCafeMenuReview));
          },
          onError(error: any) {
            console.log('error.code : ', error.code);
            console.log('error.message : ', error.message);
          },
        }
      );
    }
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

function CreateContainer() {}
