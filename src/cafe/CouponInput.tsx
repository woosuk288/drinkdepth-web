import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  TextField,
} from '@mui/material';
import { doc, runTransaction } from 'firebase/firestore';
import { useState } from 'react';
import { sxCenter } from '../styles/GlobalSx';
import { db } from '../utils/firebase/firebaseInit';
import { COUPONS } from '../utils/firebase/models';
import { useMutation } from 'react-query';

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

  const mutation = useMutation(
    () => {
      const ref = doc(db, COUPONS, code);

      const usedCoupon = runTransaction(db, async (tx) => {
        const couponDoc = await tx.get(ref);
        if (!couponDoc.exists()) {
          throw '등록되지 않은 코드 입니다.';
        } else if (couponDoc.data().isUsed === true) {
          throw '이미 사용한 코드 입니다.';
        } else {
          tx.update(ref, { isUsed: true });
          return '쿠폰 사용 완료!';
        }
      });

      return usedCoupon;
    },
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setOpen(true);
        setCode('');
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value.slice(0, 6));
  };

  const handleConfirmCoupon = () => {
    mutation.mutate();
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
      {/* {mutation.isError && <p>{(mutation.error as FirebaseError).code}</p>} */}
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
