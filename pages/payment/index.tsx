import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../../src/Link';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Button } from '@mui/material';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

const PaymentPage: NextPage = () => {
  const handlePayment = async (
    method: '카드' | '계좌이체' | '가상계좌' | '휴대폰'
  ) => {
    // 초기화 객체 생성
    const tossPayments = await loadTossPayments(clientKey);
    // * 계좌이체 결제창 열기
    tossPayments
      .requestPayment(method, {
        // 결제 수단 파라미터
        // 결제 정보 파라미터
        amount: 100,
        orderId: 'Ny_PzYKluUwE_Y8S6fNYk3',
        orderName: '토스 티셔츠 외 2건',
        customerName: '박토스',
        successUrl: `${window.location.origin}` + '/payment/success',
        failUrl: `${window.location.origin}` + '/payment/fail',
        ...((method === '가상계좌' || method === '계좌이체') && {
          cashReceipt: {
            type: '소득공제',
          },
        }),
      })
      .then((val) => {
        console.log('payment module 불러오기 : ', val);
      })
      .catch((error) => {
        // if (error.code === 'USER_CANCEL') {
        //   // 취소 이벤트 처리
        //   console.log('취소 이벤트 처리 : ', error);
        // }
        alert(error.message);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          결제수단
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: '400px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '1rem',
          margin: '0 auto',
          // grid-template-columns: 1fr 1fr;
          // grid-auto-flow: unset;
          // grid-template-rows: 168px;
          // grid-gap: 8px;
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => handlePayment('카드')}
        >
          카드결제
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => handlePayment('계좌이체')}
        >
          계좌이체
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => handlePayment('가상계좌')}
        >
          무통장입급
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => handlePayment('휴대폰')}
        >
          휴대폰결제
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentPage;
