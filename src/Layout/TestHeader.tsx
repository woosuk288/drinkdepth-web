import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { userVar, Role, roleVar } from '../../apollo/client';
import { auth, useAuthFb } from '../../firebase/clientApp';
import { USER_ROLES } from '../constants';
import { useRouter } from 'next/router';
import Image from 'next/image';

const pages = [
  {
    name: '서비스 소개',
    link: '/',
  },
  {
    name: '오늘의 음료',
    link: '/blog',
  },
  // {
  //   name: '커뮤니티',
  //   link: '/community',
  // },
  {
    name: '음료 장터',
    link: '/coffee',
  },
];

const TestHeader = () => {
  const router = useRouter();

  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="lg" sx={sx.container}>
          <Toolbar disableGutters>
            {/* desktop */}
            <Box sx={sx.desktop} onClick={() => router.push('/')}>
              <Image
                src="/images/logo_name.png"
                alt="drinkdepth-logo"
                width={200}
                height={43}
              />
            </Box>

            <Box flexGrow={{ md: 1 }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Box
                sx={{
                  ml: '1.5rem',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => router.push('/landing/register')}
                >
                  사전 알림 신청하기
                </Button>
              </Box>
            </Box>

            {/* mobile */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
              }}
              onClick={() => router.push('/')}
            >
              <Image
                src="/images/logo_name.png"
                alt="drinkdepth-logo"
                width={160}
                height={34}
              />
            </Box>
          </Toolbar>
        </Container>

        {/* <LinearProgress /> */}
      </AppBar>
    </>
  );
};
export default TestHeader;

const sx = {
  container: { paddingLeft: { xs: 1, lg: 5 }, paddingRight: { xs: 1, lg: 5 } },
  desktop: {
    ml: '-1.25rem',
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    cursor: 'pointer',
  },
  mobile: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
};
