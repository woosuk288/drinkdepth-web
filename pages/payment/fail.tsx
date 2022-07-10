import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

import Link from '../../src/Link';
import { sxCenter } from '../../src/styles/GlobalSx';

const Fail: NextPage = () => {
  const router = useRouter();

  console.log('router.query : ', router.query);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          ...sxCenter,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          결제 실패
        </Typography>
        <Box maxWidth="sm">
          <Typography variant="subtitle1">
            주문번호 {router.query.orderId}
          </Typography>
          <Typography variant="subtitle1">{router.query.message}</Typography>
        </Box>

        <Link href={'/payment'}>돌아가기</Link>
      </Box>
    </Container>
  );
};

export default Fail;
