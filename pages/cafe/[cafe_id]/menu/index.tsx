import { Container } from '@mui/material';
import CafeHeader from '../../../../src/cafe/Header';
import CafeMenu from '../../../../src/cafe/Menu';

function MenuPage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <CafeHeader title={'메뉴'} />
      <CafeMenu />
    </Container>
  );
}
export default MenuPage;
