import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import { Box, Theme } from '@mui/system';
import { SxProps } from '@mui/material';
import TestHeader from './TestHeader';

type LayoutProps = {
  children: React.ReactNode;
  sxMain?: SxProps<Theme> | undefined;
  showFooter?: boolean;
};

const Layout = ({ children, sxMain, showFooter = true }: LayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <TestHeader />
      {/* <Header /> */}
      <Box
        component="main"
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.lg,
          margin: '0 auto',
          width: '100%',
          flex: 1,
          paddingLeft: { sm: 0, lg: '2.5rem' },
          paddingRight: { sm: 0, lg: '2.5rem' },
          ...sxMain,
        }}
      >
        {children}
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
};

export default Layout;
