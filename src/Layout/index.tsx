import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import { Box, Theme } from '@mui/system';
import { SxProps } from '@mui/material';

type LayoutProps = {
  children: React.ReactNode;
  sxMain?: SxProps<Theme> | undefined;
};

const Layout = ({ children, sxMain }: LayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header />
      <Box
        component="main"
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.lg,
          margin: '0 auto',
          width: '100%',
          height: '100%',
          paddingLeft: { sm: 0, lg: 5 },
          paddingRight: { sm: 0, lg: 5 },
          ...sxMain,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
