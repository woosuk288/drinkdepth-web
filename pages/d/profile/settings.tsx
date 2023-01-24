import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import Settings from 'src/d/Settings';

const SettingsPage: NextPage = () => {
  return (
    <>
      <NextSeo title="설정 | 어떤 카페" />
      <AuthContainer>
        <HeaderD centerComponent={'설정'} />

        <Main>
          <Settings />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default SettingsPage;
