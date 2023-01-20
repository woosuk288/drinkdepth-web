import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import React, { ReactNode } from 'react';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title: ReactNode;
  textPrimary?: string;
  handlePrimary?: () => void;
  textSecondary?: string;
  colorSecondary?:
    | 'primary'
    | 'secondary'
    | 'inherit'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  handleSecondary?: () => void;
  textCancel?: string | null;
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
  colorSecondary,
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
          // '& .MuiButton-textPrimary, .MuiButton-textSecondary': {
          //   fontWeight: 800,
          // },
        }}
      >
        {namePrimary && (
          <Button
            onClick={handlePrimary}
            color="primary"
            disabled={progressing}
            sx={{ fontWeight: 800 }}
          >
            {namePrimary}
          </Button>
        )}
        {nameSecondary && (
          <Button
            onClick={handleSecondary}
            color={colorSecondary || 'secondary'}
            disabled={progressing}
            sx={{ fontWeight: 800 }}
          >
            {nameSecondary}
          </Button>
        )}
        {textCancel !== null && (
          <Button
            color="inherit"
            onClick={handleCancel || handleClose} /* autoFocus */
          >
            {textCancel || '취소'}
          </Button>
        )}
      </Box>
    </Dialog>
  );
}

export default CommonDialog;
