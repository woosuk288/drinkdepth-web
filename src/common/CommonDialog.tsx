import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import React from 'react';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  textPrimary?: string;
  handlePrimary?: () => void;
  textSecondary?: string;
  handleSecondary?: () => void;
  textCancel?: string;
  handleCancel?: () => void;
  keepMounted?: boolean;
  progressing?: boolean;
  progressingColor?: 'primary' | 'secondary';
}

function CommonDialog({
  open,
  handleClose,
  title,
  textPrimary: namePrimary,
  handlePrimary,
  textSecondary: nameSecondary,
  handleSecondary,
  textCancel,
  handleCancel,
  keepMounted = false,
  progressing = false,
  progressingColor,
}: DialogProps) {
  return (
    <Dialog
      open={open}
      onClose={keepMounted ? undefined : handleClose}
      aria-labelledby="common-dialog-title"
      aria-describedby="common-dialog-description"
      keepMounted={keepMounted}
      sx={(theme) => ({
        // '& .MuiDialogTitle-root': {
        //   padding: '32px',
        //   paddingBottom: '16px',
        //   textAlign: 'center',
        //   '& .MuiTypography-root': {
        //     fontWeight: 700,
        //   },
        // },
        '& .MuiDialog-paper': {
          borderRadius: '14px',
          width: '260px',
          [theme.breakpoints.up('sm')]: {
            width: '400px',
          },
        },
      })}
    >
      {progressing && <LinearProgress color={progressingColor} />}

      <DialogTitle
        fontWeight="bold"
        sx={{ padding: '32px', paddingBottom: '16px', textAlign: 'center' }}
        id="common-dialog-title"
      >
        {title}
      </DialogTitle>
      <Box
        sx={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',

          '& button': {
            width: '100%',
            minHeight: '48px',
            borderTop: '1px solid rgba(var(--b6a,219,219,219),1)',
          },
          '& .MuiButton-textPrimary, .MuiButton-textSecondary': {
            fontWeight: 800,
          },
        }}
      >
        {namePrimary && (
          <Button
            onClick={handlePrimary}
            color="primary"
            disabled={progressing}
          >
            {namePrimary}
          </Button>
        )}
        {nameSecondary && (
          <Button
            onClick={handleSecondary}
            color="secondary"
            disabled={progressing}
          >
            {nameSecondary}
          </Button>
        )}
        <Button
          color="inherit"
          onClick={handleCancel || handleClose} /* autoFocus */
        >
          {textCancel || '취소'}
        </Button>
      </Box>
    </Dialog>
  );
}

export default CommonDialog;
