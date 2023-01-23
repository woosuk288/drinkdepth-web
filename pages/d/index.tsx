import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

// import { Typography } from '@mui/material';
// import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
// import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import ReviewHome from 'src/d/ReviewHome';
import Image from 'next/image';

const MainPage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 홈" />
      {/* <AuthContainer> */}
      <HeaderD
        centerComponent={
          <div css={{ display: 'flex' }}>
            {/* <Typography fontSize={18} fontWeight={600}>
              전체
            </Typography> */}
            <Image
              src="/images/logo_name.png"
              alt="drinkdepth-logo"
              width={160}
              height={34}
              // width={200}
              // height={43}
            />
          </div>
        }
      />

      <Main>
        <ReviewHome />
      </Main>

      <Navbar />
      {/* </AuthContainer> */}
    </>
  );
};

export default MainPage;
