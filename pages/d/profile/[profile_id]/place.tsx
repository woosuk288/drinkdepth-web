import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import RedirectPage from 'src/common/RedirectPage';
import { O2O_PLACE_PATH } from 'src/utils/routes';

const PlacePage: NextPage = () => {
  return (
    <>
      <NextSeo title="리뷰 지도 | 어떤 카페" />
      <AuthContainer>
        <PlaceContainer />
        {/* <HeaderD leftIcon="back" centerComponent={'지도 리뷰'} />

        <Main>
          <PlaceContainer />
        </Main>

        <Navbar /> */}
      </AuthContainer>
    </>
  );
};

export default PlacePage;

function PlaceContainer() {
  return <RedirectPage path={O2O_PLACE_PATH} />;

  // return (
  //   <>
  //     <O2OPlacePage />
  //   </>
  // );
}
