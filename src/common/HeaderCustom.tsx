import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Typography } from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Back from './Back';

type HeaderCustomProps = {
  leftIcon?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const HeaderCustom = ({
  leftIcon,
  centerComponent,
  rightIcon,
}: HeaderCustomProps) => {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar disableGutters>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '48px' }}>
            {leftIcon === 'back' ? (
              <Back>
                <IconButton>
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Back>
            ) : (
              leftIcon
            )}
          </div>

          <div style={{ flex: 1 }} />

          {typeof centerComponent === 'string' ? (
            <Typography fontWeight="bold" component="h1" align="center">
              {centerComponent}
            </Typography>
          ) : (
            <div>{centerComponent}</div>
          )}

          <div style={{ flex: 1 }} />

          <div style={{ width: '48px' }}>{rightIcon}</div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderCustom;
