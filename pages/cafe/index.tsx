import { Container } from '@mui/material';
import RedirectPage from '../../src/common/RedirectPage';

function CafesPage() {
  return (
    <Container maxWidth="sm" disableGutters>
      <RedirectPage path={'/404'} />
    </Container>
  );
}
export default CafesPage;
