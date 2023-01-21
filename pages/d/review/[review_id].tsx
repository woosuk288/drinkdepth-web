import * as React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { NextSeo } from 'next-seo';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ReviewDetail from 'src/d/ReviewDetail';
import { D_CAFE_PATH, OATUH_LOGIN_PATH } from 'src/utils/routes';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import {
  addThumbUp,
  DB_REVIEWS,
  deleteReview,
  deleteThumbUp,
  fetchProfile,
  getThumbUp,
} from 'src/firebase/services';
import { IconButton } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFirestore, useStorage, useUser } from 'reactfire';
import { ParsedUrlQuery } from 'querystring';
import {
  getCacheItem,
  getCacheList,
  fetchData,
  setCache,
} from 'src/firebase/api';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { FETCH_REVIEW_THUMB_KEY } from 'src/utils/queryKeys';

const ReviewDetailPage: NextPage<Props> = ({ review }) => {
  const router = useRouter();

  const handleLocationClick = () => {
    const placeId = review.place?.id;
    const pathname = D_CAFE_PATH + `/${placeId}`;

    router.push(
      { pathname, query: { place: JSON.stringify(review.place) } },
      pathname
    );
  };

  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 상세" />
      {/* <AuthContainer> */}
      <HeaderD
        leftIcon="back"
        centerComponent={'리뷰 상세'}
        rightIcon={
          <IconButton
            color="primary"
            sx={{ padding: 0 }}
            onClick={handleLocationClick}
            className="gtm-navigation-icon"
            aria-label="location"
          >
            <LocationOnIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        }
      />

      <Main>
        <ReviewDetailContainer review={review} />
      </Main>

      <Navbar />
      {/* </AuthContainer> */}
    </>
  );
};

export default ReviewDetailPage;

type ReviewDetailContainerProps = {
  review: DReviewType;
};

function ReviewDetailContainer({ review }: ReviewDetailContainerProps) {
  const [thumbUp, setThumbUp] = React.useState(false);
  const [thumbUpCount, setThumbUpCount] = React.useState(
    review.thumbUpCount ?? 0
  );

  const queryClient = useQueryClient();
  const router = useRouter();
  const id = review.id;

  const { data: user } = useUser();
  const db = useFirestore();
  const storage = useStorage();

  const thumbQuery = useQuery(
    FETCH_REVIEW_THUMB_KEY(review.id),
    () => getThumbUp({ db, reviewId: id, uid: user!.uid }),
    {
      enabled: !!user,
      onSuccess(data) {
        if (data) {
          setThumbUp(true);
        }
      },
    }
  );

  const deleteReviewMutation = useMutation(deleteReview, {
    onSuccess: () => {
      router.back();
    },
  });

  const addThumbUpMutation = useMutation(addThumbUp, {
    onSuccess: (data) => {
      setThumbUp(true);
      setThumbUpCount((prev) => prev + 1);
      queryClient.setQueryData(FETCH_REVIEW_THUMB_KEY(review.id), data);
    },
  });

  const deleteThumbUpMutation = useMutation(deleteThumbUp, {
    onSuccess: () => {
      setThumbUp(false);
      setThumbUpCount((prev) => prev - 1);
    },
  });

  const handleReviewDelete = () => {
    if (user && confirm('삭제하시겠어요?')) {
      deleteReviewMutation.mutate({
        db,
        storage,
        reviewId: id,
        uid: user.uid,
        hasImage: review.images.length > 0,
      });
    }
  };

  const handleThumbUp = async () => {
    if (!user) {
      router.push(OATUH_LOGIN_PATH);
      // path After Login
      return;
    }

    const profile = await fetchProfile(db, user.uid);

    addThumbUpMutation.mutate({
      db,
      data: {
        collection: DB_REVIEWS,
        id: user.uid,
        reviewId: review.id,
        createdAt: new Date().toISOString(),
        profile: {
          displayName: user.displayName ?? '',
          uid: user.uid,
          photoURL: user.photoURL ?? '',
          badgeIds: profile?.badgeIds ?? [],
        },
      },
    });
  };

  const CancelThumbUp = () => {
    if (thumbQuery.data) {
      deleteThumbUpMutation.mutate({ db, data: thumbQuery.data });
    }
  };

  return (
    <ReviewDetail
      review={review}
      userId={user?.uid}
      handleReviewDelete={handleReviewDelete}
      thumbUpCount={thumbUpCount}
      thumbUp={thumbUp}
      handleThumbUp={handleThumbUp}
      CancelThumbUp={CancelThumbUp}
      isThumbUpDisabled={
        addThumbUpMutation.isLoading ||
        addThumbUpMutation.isSuccess ||
        deleteThumbUpMutation.isLoading ||
        deleteThumbUpMutation.isSuccess
      }
    />
  );
}

type Props = {
  review: DReviewType;
};

interface Params extends ParsedUrlQuery {
  review_id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let reviews;
  const url = process.env.NEXT_PUBLIC_SERVER_URL + '/reviews';

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    reviews = await getCacheList<DReviewType>('reviews');
    if (!reviews) {
      reviews = await fetchData<DReviewType[]>(url);
      await setCache('reviews', reviews);
    }
  } else {
    reviews = await fetchData<DReviewType[]>(url);
  }

  return {
    paths: reviews.map((review) => ({
      params: {
        review_id: review.id,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { review_id } = params!;

  let review = await getCacheItem<DReviewType>('reviews', review_id);

  if (!review) {
    const url = process.env.NEXT_PUBLIC_SERVER_URL + '/reviews/' + review_id;
    review = await fetchData<DReviewType>(url);
  }

  if (!review) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      review,
    },

    revalidate: 60,
  };
};
