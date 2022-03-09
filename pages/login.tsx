import React, { useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import Layout from '../src/Layout';
import PhoneNumberForm from '../src/login/PhoneNumberForm';
import VerificationCodeForm from '../src/login/VerificationCodeForm';
import InfoForm from '../src/login/InfoForm';

import { useAuthFb } from '../firebase/clientApp';
import { USER_ROLES } from '../src/constants';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../apollo/client';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthFb();
  const [isSent, setIsSent] = useState(false);
  const userRole = useReactiveVar(roleVar);

  React.useEffect(() => {
    if (user) {
      user
        .getIdTokenResult(true)
        .then((idTokenResult) => {
          // 인증 후 role 받았으면 home으로 이동
          if (
            Object.keys(idTokenResult.claims).some((c) =>
              USER_ROLES.includes(c)
            )
          ) {
            router.replace('/');
          }
          // 사업자 인증 시도 오류시 403 페이지로 이동
          else if (typeof idTokenResult.claims.error === 'string') {
            router.push('/403');
            // router.push('/403/', { state: { error: idTokenResult.claims.error } })
          } else {
            roleVar(undefined);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  //TODO: 버그가있네... || userRole === null
  // Layout, header 구조 simplemeal에서 확인해보자
  if (loading) {
    return <LinearProgress />;
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
        <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
          {user && !user?.displayName
            ? '정보 입력'
            : isSent === false
            ? '전화번호 간편 가입'
            : '인증 코드 입력'}
        </Typography>

        {user && !user?.displayName ? (
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
