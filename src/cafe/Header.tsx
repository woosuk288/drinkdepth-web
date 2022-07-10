import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// import { auth, useAuthFb } from '../../firebase/clientApp';
import { useRouter } from 'next/router';
// import Image from 'next/image';
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
    name: '홈',
    link: '/',
    icon: HomeIcon,
  },
  {
    name: '메뉴',
    link: '/menu',
    icon: CoffeeIcon,
  },
  // {
  //   name: '커뮤니티',
  //   link: '/community',
  // },
  {
    name: '주소',
    link: '/address',
    icon: LocationOnIcon,
  },
];

type CafeHeaderProps = {
  title: string;
};

const CafeHeader = ({ title }: CafeHeaderProps) => {
  const router = useRouter();
  const CAFE_PATH = '/cafe/1';

  // const [user, loading, error] = useAuthFb();
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
    router.push(`${path}`);
    handleCloseNavMenu();
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="lg" sx={sx.container}>
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
                // onClick={handleOpenNavMenu}
                color="inherit"
                style={{ minWidth: 48 }}
              >
                {/* <MenuIcon /> */}
              </IconButton>

              <Typography variant="h6" fontWeight="bold">
                {title}
              </Typography>

              <IconButton style={{ minWidth: 48 }} />
              {/* <Drawer
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
                      onClick={() => handleListItemClick(CAFE_PATH + page.link)}
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
              </Drawer> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default CafeHeader;

const sx = {
  container: { paddingLeft: { xs: 1, lg: 5 }, paddingRight: { xs: 1, lg: 5 } },
};
