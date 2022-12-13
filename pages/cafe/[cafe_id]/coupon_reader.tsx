import { Container } from '@mui/material';
import { AuthUserProvider } from 'src/context/AuthUserContext';
import CouponInput from '../../../src/cafe/CouponInput';
import CafeHeader from '../../../src/cafe/B2BHeader';

function CouponReaderPage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <AuthUserProvider>
        <CafeHeader title={'쿠폰 확인'} />
        <CouponInput />
      </AuthUserProvider>
    </Container>
  );
}
export default CouponReaderPage;
