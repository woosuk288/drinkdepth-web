import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Profile from 'src/d/Profile';

const MainPage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 프로필" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={<Typography fontWeight={'bold'}>프로필</Typography>}
        />

        <Main>
          <Profile />
        </Main>

        {/* <StyleTabs /> */}
      </AuthContainer>
    </>
  );
};

export default MainPage;
