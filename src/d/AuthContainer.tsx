import { LinearProgress } from '@mui/material';
import React from 'react';
import { useSigninCheck } from 'reactfire';
import RedirectPage from 'src/common/RedirectPage';

import { OATUH_LOGIN_PATH } from 'src/utils/routes';

function AuthContainer({ children }: { children: React.ReactNode }) {
  const { data, error, status } = useSigninCheck();

  if (status === 'loading') return <LinearProgress />;
  if (error) return <div>인증 오류!</div>;
  if (!data.signedIn) return <RedirectPage path={OATUH_LOGIN_PATH} />;

  // provider or export curreuntUser

  return (
    <div css={{ height: '100%', minHeight: '100vh', position: 'relative' }}>
      {children}
    </div>
  );
}
export default AuthContainer;
