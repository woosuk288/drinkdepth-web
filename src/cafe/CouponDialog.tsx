import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { COUPON_TYPE } from '../utils/firebase/models';

type CouponDialogProps = {
  coupon: COUPON_TYPE;
  open: boolean;
  handleClose: () => void;
};

function CouponDialog({ coupon, open, handleClose }: CouponDialogProps) {
  console.log('coupon : ', coupon);

  return (
    <Dialog
      // fullScreen={true}
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      aria-labelledby="optional-dialog-title"
    >
      <DialogTitle id="optional-dialog-title">쿠폰 번호</DialogTitle>
      <DialogContent>
        <DialogContentText>{coupon.code}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          취소
        </Button>
        {/* <Button onClick={handleClose} autoFocus>
          Agree
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
export default CouponDialog;
