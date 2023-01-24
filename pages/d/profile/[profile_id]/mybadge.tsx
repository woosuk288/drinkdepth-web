import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import Main from 'src/d/Main';
import Navbar from 'src/d/Navbar';
import BadgeList from 'src/d/BadgeList';
// import { getAuth } from 'firebase/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  checkNewBadge,
  fetchMyBadges,
  hideNewBadge,
} from 'src/firebase/services';
import { useFirestore, useUser } from 'reactfire';
import { FETCH_MY_BADGES_KEY, FETCH_PROFILE_KEY } from 'src/utils/queryKeys';

const BadgePage: NextPage = () => {
  return (
    <>
      <NextSeo title="업적 보기 | 어떤 카페" />
      <AuthContainer>
        <HeaderD leftIcon="back" centerComponent={'활동 배지'} />

        <Main>
          <BadgeContainer />
        </Main>

        <Navbar />
      </AuthContainer>
    </>
  );
};

export default BadgePage;

function BadgeContainer() {
  const router = useRouter();
  const uid = router.query.profile_id as string;
  const db = useFirestore();
  const user = useUser().data!;
  // const { data: user } = useUser();

  const queryClient = useQueryClient();

  const {
    isLoading,
    data: myBadges = [],
    error,
  } = useQuery(
    FETCH_MY_BADGES_KEY(user!.uid),
    () => fetchMyBadges(db, user!.uid),
    {
      enabled: !!user,
    }
  );

  const { mutate } = useMutation(checkNewBadge);

  const handleCheckNewBadge = (badgeId: string) => () => {
    if (!user || user.uid !== uid) return;

    mutate(
      { db, uid: user.uid, badgeId },
      {
        async onSuccess() {
          const nextBadges = myBadges.map((myBadge) =>
            myBadge.id !== badgeId ? myBadge : { ...myBadge, isNew: false }
          );
          queryClient.setQueryData(FETCH_MY_BADGES_KEY(user.uid), nextBadges);
          const hasNewBadge = nextBadges.some((badge) => badge.isNew === true);
          if (hasNewBadge === false) {
            await hideNewBadge({ db, uid: user.uid });

            const profile = queryClient.getQueryData<ProfileType>(
              FETCH_PROFILE_KEY(uid)
            );
            if (profile) {
              queryClient.setQueryData(FETCH_PROFILE_KEY(uid), {
                ...profile,
                hasNewBadge: false,
              });
            }
          }
        },
      }
    );
  };

  if (isLoading) return <LinearProgress />;

  return (
    <BadgeList myBadges={myBadges} handleCheckNewBadge={handleCheckNewBadge} />
  );
}
