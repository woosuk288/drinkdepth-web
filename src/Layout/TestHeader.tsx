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
import TagIcon from '@mui/icons-material/Tag';

import { userVar, Role, roleVar } from '../../apollo/client';
import { auth, useAuthFb } from '../../firebase/clientApp';
import { USER_ROLES } from '../constants';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

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
  const [user, loading, error] = useAuthFb();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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

            {/* mobile */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => router.push('/')}
            >
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Image
                src="/images/logo_name.png"
                alt="drinkdepth-logo"
                width={160}
                height={34}
              />

              <IconButton style={{ minWidth: 48 }} />
              <Drawer
                anchor={'left'}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <Toolbar />
                <Divider />
                <List sx={{ width: 250 }}>
                  <ListItem key={'드링크뎁스 소개'} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TagIcon />
                      </ListItemIcon>
                      <ListItemText primary={'드링크뎁스 소개'} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={'회원가입'} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TagIcon />
                      </ListItemIcon>
                      <ListItemText primary={'회원가입'} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={'공식 블로그'} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TagIcon />
                      </ListItemIcon>
                      <ListItemText primary={'공식 블로그'} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Drawer>
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
