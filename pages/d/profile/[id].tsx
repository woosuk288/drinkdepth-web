import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, LinearProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Profile from 'src/d/Profile';
import Navbar from 'src/d/Navbar';
import { auth, fetchProfile } from 'src/firebase/services';
import { FETCH_PROFILE_KEY } from 'src/utils/queryKeys';
import { useQuery } from 'react-query';

// TODO: SSR or SSG
const ProfilePage: NextPage = () => {
  return (
    <>
      <NextSeo title="DrinkDepth | 프로필" />
      <AuthContainer>
        <ProfileContainer />
      </AuthContainer>
    </>
  );
};

export default ProfilePage;

function ProfileContainer() {
  const router = useRouter();
  const id = router.query.id as string;

  const user = auth.currentUser!;
  const { isLoading, data, error } = useQuery(
    FETCH_PROFILE_KEY,
    () => fetchProfile(user.uid),
    { enabled: !!id }
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>오류가 발생했습니다!</div>;
  if (!data || !id) return <div>데이터가 존재하지 않습니다.</div>;

  const me = {
    ...data,
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    uid: user.uid,
    email: user.email,
  };

  return (
    <>
      <HeaderD leftIcon="back" centerComponent={'프로필'} />

      <Main>
        <Profile me={me} />
      </Main>

      <Navbar />
    </>
  );
}
