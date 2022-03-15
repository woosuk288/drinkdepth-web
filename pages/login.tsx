import React, { useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import Layout from '../src/Layout';
import PhoneNumberForm from '../src/login/PhoneNumberForm';
import VerificationCodeForm from '../src/login/VerificationCodeForm';
import InfoForm from '../src/login/InfoForm';

import { useAuthFb } from '../firebase/clientApp';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../apollo/client';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
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
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  // if (user?.displayName) return <div>already logged in. redrecting...</div>

  return (
    <Layout>
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
        {user && userRole === undefined ? (
          <InfoForm />
        ) : isSent === false ? (
          <PhoneNumberForm setIsSent={setIsSent} />
        ) : (
          <VerificationCodeForm />
        )}

        <span id="load-invisible-recaptcha" style={{ opacity: 1 }}></span>
      </Box>
    </Layout>
  );
};

export default LoginPage;
