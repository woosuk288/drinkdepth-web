import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_MUTATION } from '../../apollo/mutations';
import { CircularProgress } from '@mui/material';
// import ClientOnly from '../../src/common/ClientOnly';
import Layout from '../../src/Layout';
import {
  CreatePayment,
  CreatePaymentVariables,
} from '../../apollo/__generated__/CreatePayment';
import { sxCenter } from '../../styles/sx';

type QueryType = { orderId: string; amount: string; paymentKey: string };

const Success: NextPage = () => {
  const router = useRouter();

  const [createPayment, { data, loading, error }] = useMutation<
    CreatePayment,
    CreatePaymentVariables
  >(CREATE_PAYMENT_MUTATION, {
    onCompleted: (result) => {
      console.log(result);
      // if (result.createPayment.ok) {
      // }
      // if (result.createPayment.error) {
      //   alert(result.createPayment.error);
      // }
    },
    onError: (error) => {
      console.log('onError : ', error.message);
    },
  });

  React.useEffect(() => {
    console.log('useEffect router.query : ', router.query);
    if (Object.keys(router.query).length > 0) {
      createPayment({ variables: { input: router.query as QueryType } });
    }
  }, [router.query]);

  if (loading)
    return (
      <Box
        sx={{
          ...sxCenter,
        }}
        height="100%"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          결제 승인 요청 중
        </Typography>
        <CircularProgress sx={{ margin: '1rem' }} />
      </Box>
    );
  if (error) return <div>{error.message}</div>;
  if (data?.createPayment.error || !data?.createPayment.ok)
    return <div>{data?.createPayment.error}</div>;

  const { orderId, orderName, totalAmount } = data?.createPayment.payment!;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            ...sxCenter,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            주문이 완료되었습니다.
          </Typography>
          <Box maxWidth="sm">
            <img
              src="https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZHJpbmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt="unsplash test image"
              width={300}
            />
            <Typography variant="subtitle1">주문번호: {orderId}</Typography>
            <Typography variant="subtitle1">상풍명: {orderName}</Typography>
            <Typography>결제 금액: {totalAmount}</Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Success;
