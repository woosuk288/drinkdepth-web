import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/Layout';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../apollo/client';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';

const User: NextPage = () => {
  const router = useRouter();
  const userRole = useReactiveVar(roleVar);

  // if (!userRole) router.push('/login');

  return (
    <Layout>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 600,
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ margin: '60px 0' }}>
          내 정보
        </Typography>
        <Box
          sx={{
            width: {
              xs: '280px',
              sm: '400px',
            },
            '& > div': { marginBottom: '1rem' },
          }}
        >
          <div>전화번호</div>
          <div>사업자 등록번호</div>
          <div>대표자성명</div>
          <div>상호</div>
          <div>사업자등록증</div>

          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            aria-label="ask for sign-out"
            size="large"
            sx={{ marginTop: '3rem', fontSize: 18, fontWeight: 'bold' }}
          >
            로그아웃
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default User;
