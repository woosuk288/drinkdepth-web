import { Container } from '@mui/material';
import CafeHeader from '../../../src/cafe/Header';
import Intro from '../../../src/cafe/Intro';
import Menus from '../../../src/cafe/Menus';

function CafePage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <CafeHeader title={'나무사이로'} />
      <Intro />
      <Menus />
    </Container>
  );
}
export default CafePage;
