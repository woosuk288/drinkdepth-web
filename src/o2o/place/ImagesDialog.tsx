import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from 'react';
import { SellerType } from '../../../pages/o2o/place';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ImagesDialogProps = {
  open: boolean;
  handleClose: () => void;

  seller: SellerType;
};

function ImagesDialog({ open, handleClose, seller }: ImagesDialogProps) {
  return (
    <div>
      <Dialog
        fullScreen
        scroll={'body'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {seller.placeImages.map((image, i) => (
          <img src={image} alt={`${i + 1} 번째 사진`} key={i} width="100%" />
        ))}
        {/* <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          aaa
        </DialogTitle> */}

        {/* <DialogContent>bbb</DialogContent> */}
        <div style={{ marginBottom: '56px' }}></div>

        <DialogActions
          sx={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            backgroundColor: 'white',
            // boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
          }}
        >
          <IconButton
            // edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <span style={{ flex: 1 }}></span>

          <Box
            id="kakao-link-btn"
            sx={{
              display: 'flex',
              alignItems: 'center' /* cursor: 'pointer' */,
            }}
          >
            <Avatar src={seller.logoURLs['100x100']} />
            <Typography
              variant="h6"
              sx={{ marginX: '0.5rem', color: '#3A2929' }}
            >
              {seller.name}
            </Typography>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImagesDialog;
