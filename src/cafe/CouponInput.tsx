import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { sxCenter } from '../styles/GlobalSx';

import { useMutation } from 'react-query';
import { acceptCoupon } from 'src/firebase/services';

function CouponInput() {
  const [open, setOpen] = useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [code, setCode] = useState('');

  const mutation = useMutation(acceptCoupon, {
    onSuccess: (data) => {
      // console.log('data : ', data);
      setOpen(true);
      setCode('');
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value.slice(0, 6));
  };

  const handleConfirmCoupon = () => {
    mutation.mutate({ code });
  };

  return (
    <Box sx={{ height: '100vh', marginTop: '-56px', ...sxCenter }}>
      <TextField
        label="쿠폰 코드"
        value={code}
        onChange={handleChange}
        error={mutation.isError}
        helperText={mutation.isError && (mutation.error as string)}
      />
      <Button
        variant="contained"
        size="large"
        sx={{ width: '195px', marginTop: '0.25rem' }}
        onClick={handleConfirmCoupon}
        disabled={mutation.isLoading || code.length < 6}
      >
        확인
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleClose}
          variant="outlined"
          severity="info"
          sx={{ width: '100%' }}
        >
          <AlertTitle>성공</AlertTitle>
          쿠폰 사용이 완료되었습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default CouponInput;
