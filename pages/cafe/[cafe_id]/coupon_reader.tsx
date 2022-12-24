import { Container } from '@mui/material';
import CouponInput from '../../../src/cafe/CouponInput';
import CafeHeader from '../../../src/cafe/B2BHeader';
import AuthContainer from 'src/d/AuthContainer';

function CouponReaderPage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <AuthContainer>
        <CafeHeader title={'쿠폰 확인'} />
        <CouponInput />
      </AuthContainer>
    </Container>
  );
}
export default CouponReaderPage;
