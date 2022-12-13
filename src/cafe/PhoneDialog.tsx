import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { acceptCoupon } from 'src/firebase/services';

import NumberFormat, { InputAttributes } from 'react-number-format';

type PhoneDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleIssueCoupon: (handleIssueCoupon: string) => void;
};

function PhoneDialog({
  open,
  handleClose,
  handleIssueCoupon,
}: PhoneDialogProps) {
  // console.log('coupon : ', coupon);

  const [phoneNumber, setPhoneNumber] = useState('');

  const mutation = useMutation(acceptCoupon, {
    onSuccess: (data) => {
      // console.log('data : ', data);
      handleClose();
    },
  });

  const handleConfirmCoupon = () => {
    // mutation.mutate({ code: coupon.code });
    handleIssueCoupon(phoneNumber);
  };

  return (
    <Dialog
      // fullScreen={true}
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={handleClose}
      aria-labelledby="optional-dialog-title"
    >
      <>
        {/* 사용 완료 */}

        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          전화번호
        </DialogTitle>
        <DialogContentText color="inherit" align="center">
          쿠폰 사용 만기 전 알림을 드립니다.
          {/* <br /> */}
        </DialogContentText>
        {/* <DialogContent></DialogContent> */}
        <DialogContent>
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            name="numberformat"
            id="formatted-numberformat-input"
            fullWidth
            placeholder="숫자만 입력"
            autoComplete="off"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
              sx: {
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
            autoFocus
          />
        </DialogContent>

        <DialogContentText variant="caption" align="center" marginY={'1rem'}>
          이벤트 기간이 끝난후 해당 정보는{' '}
          <span style={{ fontWeight: '500' }}>즉시 파기</span>됩니다.
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="inherit"
            fullWidth
            disabled={mutation.isLoading}
          >
            취소
          </Button>
          <Button
            onClick={handleConfirmCoupon}
            variant="contained"
            // color="error"
            // sx={{ color: 'red' }}
            fullWidth
            disabled={mutation.isLoading || phoneNumber.length !== 11}
          >
            쿠폰 발행 완료
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
}
export default PhoneDialog;

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format={'### #### ####'}
    />
  );
});
