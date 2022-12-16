import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import BadgeList from 'src/d/BadgeList';

const SettingsPage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 업적 보기" />
      <AuthContainer>
        <HeaderD leftIcon="back" centerComponent={'활동 배지'} />

        <Main>
          <BadgeList />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default SettingsPage;
