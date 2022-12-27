import * as React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, IconButton, LinearProgress, Typography } from '@mui/material';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Profile from 'src/d/Profile';
import Navbar from 'src/d/Navbar';
import { fetchProfile } from 'src/firebase/services';
import { FETCH_PROFILE_KEY } from 'src/utils/queryKeys';
import { useQuery } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { PROFILE_SETTINGS_PATH } from 'src/utils/routes';
import { useFirestore, useUser } from 'reactfire';

// TODO: SSR or SSG
const ProfilePage: NextPage /* <Props> */ = () => {
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
  const db = useFirestore();
  // const { data: user } = useUser();
  const router = useRouter();
  const uid = router.query.profile_id as string;

  // console.log('user : ', user);

  // console.log('uid : ', uid);

  const { isLoading, data, error } = useQuery(
    FETCH_PROFILE_KEY,
    () => fetchProfile(db, uid),
    { enabled: !!uid }
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>오류가 발생했습니다!</div>;
  if (!data || !uid) return <div>데이터가 존재하지 않습니다.</div>;

  return (
    <>
      <HeaderD
        leftIcon={
          <IconButton onClick={() => router.push(PROFILE_SETTINGS_PATH)}>
            <SettingsOutlinedIcon />
          </IconButton>
        }
        centerComponent={'프로필'}
      />

      <Main>
        <Profile profile={data} />
      </Main>

      <Navbar />
    </>
  );
}

// type Props = {
//   profile: ProfileType;
// };

// interface Params extends ParsedUrlQuery {
//   profile_id: string;
// }

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const profiles = await fetchProfiles();

//   return {
//     paths: profiles.map((profile) => ({
//       params: {
//         profile_id: profile.id,
//       },
//     })),
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps: GetStaticProps<Props, Params> = async ({
//   params,
// }) => {
//   if (!params?.profile_id) return { notFound: true };

//   const profile = await fetchProfile(params.profile_id);

//   if (!profile) return { notFound: true };

//   return {
//     props: {
//       profile,
//     },
//     revalidate: 1800,
//   };
// };
