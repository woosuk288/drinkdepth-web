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

// import { userVar, Role, roleVar } from '../../apollo/client';
import { auth, useAuthFb } from '../utils/firebase/firebaseInit';
// import { USER_ROLES } from '../utils/constants';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { OATUH_LOGIN_PATH } from '../utils/routes';
import { PATH_AFTER_LOGIN } from '../utils/constants';

const pages = [
  {
    name: '서비스 소개',
    link: '/',
  },
  {
    name: '인생 커피맵',
    link: '/o2o',
  },
];

const Header = () => {
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

  const goLoginPage = () => {
    localStorage.setItem(PATH_AFTER_LOGIN, router.asPath);
    router.push(OATUH_LOGIN_PATH);
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

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => router.push(`${page.link}`)}
                  color="inherit"
                  sx={{
                    px: '1rem',
                    fontSize: 16,
                    fontWeight:
                      router.pathname === page.link
                        ? 700
                        : page.link !== '/' &&
                          router.pathname.includes(page.link)
                        ? 700
                        : 'inherit',
                  }}
                >
                  {page.name}
                </Button>
              ))}

              <Box
                sx={{
                  ml: '1.5rem',
                }}
              >
                {loading ? (
                  <Button disabled>loading</Button>
                ) : user ? (
                  //  && userRole
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => router.push('/user')}
                    >
                      <AccountCircleIcon fontSize="large" />
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => router.push({ pathname: '/order' })}
                      sx={{
                        fontWeight: router.pathname.includes('/order')
                          ? 700
                          : 'inherit',
                      }}
                    >
                      주문관리
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={goLoginPage}>
                    로그인
                  </Button>
                )}
              </Box>
            </Box>

            {/* mobile */}
            <Box sx={sx.mobile}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => router.push(`${page.link}`)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}

                <Box>
                  {loading ? (
                    <Button disabled>loading</Button>
                  ) : user ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => router.push('/user')}
                      >
                        <AccountCircleIcon fontSize="large" />
                      </IconButton>
                      <Button
                        variant="contained"
                        onClick={() => router.push({ pathname: '/order' })}
                        sx={{
                          mr: '1rem',
                          fontWeight: router.pathname.includes('/order')
                            ? 700
                            : 'inherit',
                        }}
                      >
                        주문관리
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained" onClick={goLoginPage}>
                      로그인
                    </Button>
                  )}
                </Box>
              </Menu>
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              onClick={() => router.push('/')}
            >
              <Image
                src="/images/logo_name.png"
                alt="drinkdepth-logo"
                width={160}
                height={34}
              />
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                width: 48,
                display: { xs: 'flex', md: 'none' },
              }}
            ></Box>
          </Toolbar>
        </Container>

        {/* <LinearProgress /> */}
      </AppBar>
    </>
  );
};
export default Header;

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
