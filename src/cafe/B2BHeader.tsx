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
  Avatar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { CAFE_PATH, OATUH_LOGIN_PATH } from '../utils/routes';
import KakaoChat from 'src/common/KakaoChat';
import { useUser } from 'reactfire';
import { logoutKakao } from 'src/firebase/services';

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

type B2BHeaderProps = {
  title: string;
};

const B2BHeader = ({ title }: B2BHeaderProps) => {
  const router = useRouter();
  const { status, data: user } = useUser();

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
    router.push({
      pathname: OATUH_LOGIN_PATH,
      query: { previousPath: router.asPath },
    });
  };

  const handleLogout = async () => {
    if (!user) return;

    try {
      logoutKakao().then(() => handleCloseNavMenu());
    } catch (error) {
      console.log(error);
      alert('로그아웃 중 오류 발생!');
    }
  };

  const lastSegmentOfURL = router.pathname.split('/').pop();
  const hasMenu =
    lastSegmentOfURL !== 'tablet' && router.pathname.startsWith('/cafe');

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
          {hasMenu ? (
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
          ) : (
            <div style={{ minWidth: 48 }} />
          )}

          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>

          <IconButton style={{ minWidth: 48 }} />

          <Drawer
            anchor={'left'}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <Toolbar>
              {user && (
                <div>
                  <IconButton sx={{ mr: '4px', pl: 0 }}>
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      src={user.photoURL ?? ''}
                    ></Avatar>
                  </IconButton>
                  {user.displayName}
                </div>
              )}
            </Toolbar>

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
                  className="gtm-logout"
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

            <Box
              sx={{
                boxShadow: 3,
                width: '8rem',
                height: '5rem',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#101010' : '#fff',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                p: 1,
                m: 1,
                borderRadius: 2,
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '700',
              }}
            >
              boxShadow: 3
            </Box>

            {Boolean(anchorElNav) && <KakaoChat />}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default B2BHeader;
