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
// import { USER_ROLES } from '../utils/constants';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { OATUH_LOGIN_PATH } from '../utils/routes';
import { logoutKakao } from 'src/firebase/services';
import { useUser } from 'reactfire';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

const pages = [
  {
    name: '카페 추천',
    link: 'https://tally.so/r/3jbGK9',
  },
  {
    name: '카페 등록',
    link: '/yet',
    // link: '/o2o',
  },
  {
    name: '개발 소식',
    link: '/yet',
    // link: 'https://landing.drinkdepth.com',
  },
];

const Header = () => {
  const router = useRouter();
  const { status, data: user } = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    router.push({
      pathname: OATUH_LOGIN_PATH,
      query: { previousPath: router.asPath },
    });
  };

  const handleNavLinkClick = (link: string) => () => {
    if (link.startsWith('/yet')) {
      alert('준비 중입니다.');
      return;
    }

    if (link.startsWith('http')) {
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.click();
    } else {
      router.push(`${link}`);
    }
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
                  onClick={handleNavLinkClick(page.link)}
                  color="inherit"
                  sx={{
                    px: '1rem',
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {page.name}
                </Button>
              ))}
              {/*
              <Box
                sx={{
                  ml: '1.5rem',
                }}
              >
                {status === 'loading' ? (
                  <Button disabled>loading</Button>
                ) : user ? (
                  //  && userRole
                  <>
                    <IconButton
                      color="primary"
                      // onClick={() => router.push(OATUH_LOGIN_PATH)}
                    >
                      <AccountCircleIcon fontSize="large" />
                    </IconButton>
                  </>
                ) : (
                  // onClick={goLoginPage}
                  <Button variant="contained" >
                    로그인
                  </Button>
                )}
              </Box>
               */}
            </Box>

            {/* mobile */}
            <Box sx={sx.mobile}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor={'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
              >
                {/* {list(anchor)} */}
                <Box width={250}>
                  <Toolbar />
                  <List>
                    {pages.map((page) => (
                      <ListItem
                        key={page.name}
                        disablePadding
                        onClick={handleNavLinkClick(page.link)}
                      >
                        <ListItemButton>
                          <ListItemText
                            primary={page.name}
                            sx={{ '.MuiTypography-root': { fontWeight: 600 } }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>

                  {/* <List>
                    <ListItemButton>
                      {status === 'loading' ? (
                        <div>loading</div>
                      ) : user ? (
                        <ListItemButton>
                          <Button
                            fullWidth
                            color="error"
                            // variant="outlined"

                            onClick={logoutKakao}
                          >
                            로그아웃
                          </Button>
                        </ListItemButton>
                      ) : (
                        <ListItemButton>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={goLoginPage}
                          >
                            로그인
                          </Button>
                        </ListItemButton>
                      )}
                    </ListItemButton>
                  </List> */}
                </Box>
              </Drawer>
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
