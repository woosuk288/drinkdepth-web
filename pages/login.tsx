import React, { useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import Layout from '../src/Layout';
import PhoneNumberForm from '../src/login/PhoneNumberForm';
import VerificationCodeForm from '../src/login/VerificationCodeForm';
import InfoForm from '../src/login/InfoForm';

import { useAuthFb } from '../firebase/clientApp';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../apollo/client';
import RedirectPage from '../src/common/RedirectPage';

const LoginPage = () => {
  const [user, loading, error] = useAuthFb();
  const [isSent, setIsSent] = useState(false);
  const userRole = useReactiveVar(roleVar);

  console.log('userRole : ', userRole);

  if (loading || userRole === null) {
    return (
      <Layout>
        <LinearProgress />
      </Layout>
    );
  }

  if (error) {
    console.error(error.name, error.message);
    return (
      <div>
        <p>로그인 오류!</p>
      </div>
    );
  }

  return (
    <Layout>
      <span id="load-invisible-recaptcha"></span>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 600,
        }}
      >
        {!user && isSent === false ? (
          <PhoneNumberForm setIsSent={setIsSent} />
        ) : !user && isSent === true ? (
          <VerificationCodeForm />
        ) : user && userRole === undefined ? (
          <InfoForm />
        ) : (
          <RedirectPage path="/" />
        )}
      </Box>
    </Layout>
  );
};

export default LoginPage;
