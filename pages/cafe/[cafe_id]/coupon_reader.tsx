import { Container } from '@mui/material';
import CouponInput from '../../../src/cafe/CouponInput';
import CafeHeader from '../../../src/cafe/Header';

function CouponReaderPage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <CafeHeader title={'쿠폰 확인'} />
      <CouponInput />
    </Container>
  );
}
export default CouponReaderPage;
