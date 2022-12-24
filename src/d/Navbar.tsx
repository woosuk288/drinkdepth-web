import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { D_PATH, CREATE_PATH, PROFILE_PATH } from 'src/utils/routes';
import { useRouter } from 'next/router';
// import { auth } from 'src/firebase/firebaseInit';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  cafeMenuReviewState,
  defaultCafeMenuReview,
} from 'atoms/reviewFormAtom';
import { getProfileId } from 'src/utils/etc';
import { useUser } from 'reactfire';

const NAV_ROUTES: { [key: string]: number } = {
  [D_PATH]: 0,
  [CREATE_PATH]: 1,
  [PROFILE_PATH]: 2,
} as const;

export default function Navbar() {
  const { data: user } = useUser();
  const router = useRouter();
  const setPost = useSetRecoilState(cafeMenuReviewState);

  const [value, setValue] = React.useState(NAV_ROUTES[router.pathname]);
  const BOTTOM_LINKS = [D_PATH, CREATE_PATH, PROFILE_PATH];

  const AVATAR_SIZE = value === 2 ? 26 : 24;

  const handleChange = (_: any, newValue: number) => {
    // setValue(newValue);
    const path = BOTTOM_LINKS[newValue];

    if (path === CREATE_PATH && user) {
      setPost({
        ...defaultCafeMenuReview,
        uid: user.uid,
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      });
    } else if (path === PROFILE_PATH) {
      const profileId = user ? getProfileId(user.uid) : '';
      router.push(path + '/' + profileId);
      return;
    }

    router.push(path);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        // display: { md: 'none' },
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: '44px',
          '& button.Mui-selected': { color: '#000000' },
        }}
      >
        <BottomNavigationAction
          sx={{
            svg: { fontSize: '30px' },
          }}
          icon={value === 0 ? <HomeRoundedIcon /> : <HomeOutlinedIcon />}
        />
        <BottomNavigationAction
          icon={<AddBoxOutlinedIcon sx={{ fontSize: '28px' }} />}
        />

        <BottomNavigationAction
          icon={
            user?.photoURL ? (
              <Avatar
                src={user?.photoURL}
                sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
              />
            ) : (
              <AccountCircleIcon
                sx={{
                  fontSize: '28px',
                  color: value === 2 ? 'inherit' : '#bdbdbd',
                }}
              />
            )
          }
        />
      </BottomNavigation>
    </Box>
  );
}
