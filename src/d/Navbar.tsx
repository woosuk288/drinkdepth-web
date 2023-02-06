import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import {
  D_PATH,
  D_CREATE_PATH,
  D_PROFILE_PATH,
  OATUH_LOGIN_PATH,
} from 'src/utils/routes';
import { useRouter } from 'next/router';
// import { auth } from 'src/firebase/firebaseInit';
import { useSetRecoilState } from 'recoil';

import {
  cafeMenuReviewState,
  defaultCafeMenuReview,
} from 'atoms/reviewFormAtom';
import { useUser } from 'reactfire';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CommonDialog from 'src/common/CommonDialog';
import { REVIEW_BADGE_REWARD } from 'src/utils/constants';
import { LetterDIcon } from './BadgeList';

const NAV_ROUTES: { [key: string]: number } = {
  [D_PATH]: 0,
  [D_CREATE_PATH]: 1,
  [D_PROFILE_PATH]: 2,
} as const;

export default function Navbar() {
  const { data: user } = useUser();
  const router = useRouter();
  const setReview = useSetRecoilState(cafeMenuReviewState);

  const [value, setValue] = React.useState(NAV_ROUTES[router.pathname]);
  const BOTTOM_LINKS = [D_PATH, D_CREATE_PATH, D_PROFILE_PATH];

  const AVATAR_SIZE = value === 2 ? 26 : 24;

  const handleChange = (_: any, newValue: number) => {
    // setValue(newValue);
    const path = BOTTOM_LINKS[newValue];

    if (!user && path === D_PROFILE_PATH) {
      router.push({
        pathname: OATUH_LOGIN_PATH,
        query: { previousPath: router.asPath },
      });
      return;
    } else if (user && path === D_PROFILE_PATH) {
      router.push(path + '/' + user.uid);
      return;
    }

    if (path === D_CREATE_PATH && user) {
      setReview({
        ...defaultCafeMenuReview,
      });
    }
    router.push(path);
  };

  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const handlePrimary = () => {
    const today = new Date();
    const week = today.setDate(today.getDate() + 7);
    localStorage.setItem(REVIEW_BADGE_REWARD, new Date(week).toISOString());
    setTooltipOpen(false);
    setDialogOpen(false);
  };
  const handleSecondary = () => {
    localStorage.setItem(REVIEW_BADGE_REWARD, 'disabled');
    setTooltipOpen(false);
    setDialogOpen(false);
  };

  // null, week(날짜+7), disabled, completed
  React.useEffect(() => {
    const rewardStatus = localStorage.getItem(REVIEW_BADGE_REWARD);

    if (
      !rewardStatus ||
      (isNaN(Date.parse(rewardStatus)) === false &&
        new Date().toISOString() > rewardStatus)
    ) {
      setTooltipOpen(true);
    }
  }, []);

  return (
    <>
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

          <Tooltip
            title={
              <div css={{ padding: '0.75rem 1.5rem', position: 'relative' }}>
                <IconButton
                  color="inherit"
                  size="small"
                  sx={{ position: 'absolute', right: -8, top: -4 }}
                  onClick={openDialog}
                >
                  <CancelOutlinedIcon />
                </IconButton>
                <Typography>리뷰를 남기고 보상을 받으세요!</Typography>
              </div>
            }
            open={tooltipOpen}
            arrow
          >
            <BottomNavigationAction
              icon={<AddBoxOutlinedIcon sx={{ fontSize: '28px' }} />}
            />
          </Tooltip>

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

      {/* {tooltipOpen && } */}
      {dialogOpen && (
        <CommonDialog
          // title={"지금 리뷰를 남기시면 배지를 드려요!"}
          title={
            <>
              지금 리뷰를 남기고 <br />
              <span css={{ position: 'relative' }}>
                <Tooltip
                  key={'00010'}
                  arrow
                  enterTouchDelay={10}
                  leaveTouchDelay={30000}
                  title={`[개국 공신] - 드링크뎁스의 초창기 유저로서 성장에 기여한 분에게만 제공되는 한정판 배지`}
                >
                  <Avatar
                    sx={{
                      position: 'absolute',
                      right: 6,
                      bottom: -8,
                      bgcolor: 'transparent',
                      border: `1px solid ${'#4f9cff'} !important`,
                      '> svg': { color: '#4f9cff' },
                    }}
                  >
                    <LetterDIcon />
                  </Avatar>
                </Tooltip>
                <span css={{ visibility: 'hidden' }}>보상</span>
              </span>
              받으세요!
            </>
          }
          open={dialogOpen}
          handleClose={closeDialog}
          textPrimary="일주일간 숨기기"
          handlePrimary={handlePrimary}
          textSecondary="더 이상 안 볼래요"
          colorSecondary="inherit"
          handleSecondary={handleSecondary}
          textCancel={null}
        />
      )}
    </>
  );
}
