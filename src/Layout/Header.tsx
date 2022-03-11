import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { LinearProgress } from '@mui/material';

import { isLoggedInVar, Role, roleVar } from '../../apollo/client';
import { useReactiveVar } from '@apollo/client';
import { signOut } from 'firebase/auth';
import { auth, useAuthFb } from '../../firebase/clientApp';
import { USER_ROLES } from '../constants';
import { useRouter } from 'next/router';

const pages = [
  {
    name: '서비스 소개',
    link: '/',
  },
  {
    name: '블로그',
    link: '/blog',
  },
  {
    name: '음료',
    link: '/drink',
  },
];

const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthFb();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  // const isLoggedIn = useReactiveVar(isLoggedInVar);
  const userRole = useReactiveVar(roleVar);

  React.useEffect(() => {
    if (user) {
      isLoggedInVar(!!user);
      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          const role = Object.keys(idTokenResult.claims).find((c) =>
            USER_ROLES.includes(c)
          );
          roleVar(role as Role);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠어요?')) {
      await signOut(auth);
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Container
          maxWidth="lg"
          sx={{ paddingLeft: { xs: 1, lg: 5 }, paddingRight: { xs: 1, lg: 5 } }}
        >
          <Toolbar disableGutters>
            {/* desktop */}
            <Box
              sx={{
                ml: '-1.25rem',
                mr: 2,
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Box sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
                <img
                  src="/images/logo_name.png"
                  alt="drinkdepth-logo"
                  width={200}
                />
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => router.push(`${page.link}`)}
                  color="inherit"
                  sx={{
                    my: 2,
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

              {loading ? (
                <Button
                  disabled
                  sx={{
                    ml: 2,
                    my: 2,
                    fontSize: 16,
                  }}
                >
                  loading
                </Button>
              ) : user && userRole ? (
                <Button
                  onClick={handleLogout}
                  sx={{
                    ml: 2,
                    my: 2,
                    fontSize: 16,
                  }}
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() =>
                    router.push({
                      pathname: '/login',
                      query: { prev: router.pathname },
                    })
                  }
                  sx={{
                    ml: 2,
                    my: 2,
                    fontSize: 16,
                  }}
                >
                  로그인
                </Button>
              )}
            </Box>

            {/* mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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

                {loading ? (
                  <Button
                    disabled
                    sx={{
                      ml: 2,
                      my: 2,
                      fontSize: 16,
                    }}
                  >
                    loading
                  </Button>
                ) : user && userRole ? (
                  <Button
                    onClick={handleLogout}
                    sx={{
                      ml: 2,
                      my: 2,
                      fontSize: 16,
                    }}
                  >
                    로그아웃
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() =>
                      router.push({
                        pathname: '/login',
                        query: { prev: router.pathname },
                      })
                    }
                    sx={{
                      ml: 2,
                      my: 2,
                      fontSize: 16,
                    }}
                  >
                    로그인
                  </Button>
                )}
              </Menu>
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              onClick={() => router.push('/')}
            >
              <img
                src="/images/logo_name.png"
                alt="drinkdepth-logo"
                width={160}
                height={40}
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
