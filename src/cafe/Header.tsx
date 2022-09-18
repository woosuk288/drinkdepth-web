import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useRouter } from 'next/router';
// import Image from 'next/image';
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { auth } from '../utils/firebase/firebaseInit';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthUserContext';
import { CAFE_PATH, OATUH_LOGIN_PATH } from '../utils/routes';
import { PATH_AFTER_LOGIN } from '../utils/constants';

const pages = [
  // {
  //   name: '홈',
  //   link: '/',
  //   icon: HomeIcon,
  // },
  {
    name: '소개 및 메뉴',
    link: CAFE_PATH,
    icon: CoffeeIcon,
  },
  // {
  //   name: '주소',
  //   link: '/address',
  //   icon: LocationOnIcon,
  // },
];

type CafeHeaderProps = {
  title: string;
};

const CafeHeader = ({ title }: CafeHeaderProps) => {
  const router = useRouter();

  const { user } = useAuth();
  console.log('CafeHeader user : ', user);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleListItemClick = (path: string) => {
    console.log('path : ', path);

    router.push(`${path}`);
    handleCloseNavMenu();
  };

  const handleLogin = () => {
    localStorage.setItem(PATH_AFTER_LOGIN, router.asPath);
    router.push(OATUH_LOGIN_PATH);
  };

  const handleLogout = async () => {
    try {
      // kakao logout?
      const kakaoUID = auth.currentUser?.uid.replace('kakao:', '');
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/kakao/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kakaoUID,
        }),
      });
      // firebase logout
      signOut(auth).then(() => handleCloseNavMenu());
    } catch (error) {
      console.log(error);
      alert('로그아웃 중 오류 발생!');
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar disableGutters>
        {/* mobile */}

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            style={{ minWidth: 48 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>

          <IconButton style={{ minWidth: 48 }} />
          <Drawer
            anchor={'left'}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <Toolbar />
            <Divider />
            <List sx={{ width: 250 }}>
              {pages.map((page) => (
                <ListItem
                  key={page.name}
                  disablePadding
                  onClick={() =>
                    handleListItemClick(page.link + '/' + router.query.cafe_id)
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <page.icon />
                    </ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Toolbar>
              {user ? (
                <Button
                  fullWidth
                  color="error"
                  sx={{ marginTop: '2rem' }}
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: '2rem' }}
                  onClick={handleLogin}
                >
                  로그인
                </Button>
              )}
            </Toolbar>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default CafeHeader;
