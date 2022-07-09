import { Container } from '@mui/material';
import CafeHeader from '../../../src/cafe/Header';
import Cafe from '../../../src/cafe/Home';

function CafePage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <CafeHeader title={'슬로우디'} />
      <Cafe />
    </Container>
  );
}
export default CafePage;
