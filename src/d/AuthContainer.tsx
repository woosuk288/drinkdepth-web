import { LinearProgress } from '@mui/material';
import React from 'react';
import RedirectPage from 'src/common/RedirectPage';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import { OATUH_LOGIN_PATH } from 'src/utils/routes';

function AuthContainer({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebaseAuth();

  if (loading) return <LinearProgress />;

  if (!user) return <RedirectPage path={OATUH_LOGIN_PATH} />;

  return (
    <div css={{ height: '100%', minHeight: '100vh', position: 'relative' }}>
      {children}
    </div>
  );
}
export default AuthContainer;
