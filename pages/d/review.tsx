import * as React from 'react';
import type { NextPage } from 'next';

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

const ReviewPage: NextPage = () => {
  const review = useRecoilValue(cafeMenuReviewState);

  if (!review) return <RedirectPage path={NOT_FOUND_PATH} />;

  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 상세" />
      <AuthContainer>
        <HeaderD leftIcon="back" centerComponent={'리뷰'} />

        <Main>
          <ReviewDetail review={review} />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default ReviewPage;
