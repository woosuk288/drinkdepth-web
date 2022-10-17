import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { DOMAIN_OFFLINE_QR_TABLET } from 'src/utils/constants';
import { CAFE_PATH } from 'src/utils/routes';

type CouponWIthQRProps = {
  cafeId: string;
};
function CouponWIthQR({ cafeId }: CouponWIthQRProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ textAlign: 'center', margin: '3rem 0' }}>
      <Button
        sx={{
          width: '50%',
          height: 64,
          margin: '1rem',
          fontSize: 20,
          fontWeight: 500,
          borderRadius: 16,
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        쿠폰 발행
      </Button>

      <QRDialog open={open} handleClose={handleClose} cafeId={cafeId} />
    </div>
  );
}
export default CouponWIthQR;

type QRDialogProps = {
  open: boolean;
  handleClose: () => void;
  cafeId: string;
};
function QRDialog({ open, handleClose, cafeId }: QRDialogProps) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>QR 코드</DialogTitle>
      <DialogContent>
        <QRCode
          value={
            'https://' + DOMAIN_OFFLINE_QR_TABLET + CAFE_PATH + `/${cafeId}`
          }
          level="H"
          size={300}
        />
        <DialogContentText align="center" margin={'2rem 0 1rem'}>
          1000원 할인 or 아메리카노+1 <br />
          (둘중하나 선택)
        </DialogContentText>
      </DialogContent>

      <DialogContentText variant="caption" align="center" marginY={'1rem'}>
        1인당 한개의 쿠폰만 가능합니다.
      </DialogContentText>
    </Dialog>
  );
}
