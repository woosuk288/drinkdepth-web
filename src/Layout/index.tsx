import * as React from 'react';

import Header from './Header';
import Footer from './Footer';
import { Box, Theme } from '@mui/system';
import { SxProps } from '@mui/material';

type LayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  sxMain?: SxProps<Theme> | undefined;
  showFooter?: boolean;
};

const Layout = ({
  header,
  children,
  sxMain,
  showFooter = true,
}: LayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      {header || <Header />}
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
