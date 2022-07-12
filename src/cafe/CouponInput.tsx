import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { sxCenter } from '../styles/GlobalSx';

function CouponInput() {
  const [code, setCode] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value.slice(0, 6));
  };

  const handleConfirmCoupon = () => {};

  return (
    <Box sx={{ height: '100vh', marginTop: '-56px', ...sxCenter }}>
      <TextField label="쿠폰 코드" value={code} onChange={handleChange} />
      <Button
        variant="contained"
        sx={{ width: '195px', marginTop: '0.25rem' }}
        onClick={handleConfirmCoupon}
      >
        확인
      </Button>
    </Box>
  );
}
export default CouponInput;
