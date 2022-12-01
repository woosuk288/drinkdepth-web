import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ReviewMenu from 'src/d/ReviewMenu';

const ReviewMenuPage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 홈" />
      <AuthContainer>
        <HeaderD leftIcon="back" centerComponent={'리뷰'} />

        <Main>
          <ReviewMenu />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default ReviewMenuPage;
