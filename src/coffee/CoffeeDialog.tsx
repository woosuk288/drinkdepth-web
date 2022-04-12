import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { sxCenter } from '../../styles/sx';
import { useRouter } from 'next/router';

type Order = {
  name: string;
  image_url: string;
  unit: string;
  quantity: number;
  price: number;
};

type CoffeeDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order;
};

export default function CoffeeDialog({
  open,
  setOpen,
  order,
}: CoffeeDialogProps) {
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        // style={{ height: '100%' }}
        sx={{ '.MuiDialog-paper': { height: '100%' } }}
      >
        <Box sx={{ ...sxCenter }}>
          <Typography variant="h5" fontWeight={600} margin="3rem 1rem">
            입금이 완료되면 주문이 접수됩니다
          </Typography>
          <Card sx={{ maxWidth: '500px', width: '100%' }}>
            <CardContent
              sx={{
                '& > div ': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                },
              }}
            >
              <Box>
                <Typography variant="body2">입금 은행</Typography>
                <Typography variant="subtitle2">국민은행</Typography>
              </Box>
              <Box>
                <Typography variant="body2">계좌번호</Typography>
                <Typography variant="subtitle2">1230000456789</Typography>
              </Box>

              <Box>
                <Typography variant="body2">예금주</Typography>
                <Typography variant="subtitle2">나무사이로</Typography>
              </Box>

              <Typography color="warning.main" variant="body2">
                04월 12일 09시 54분 전까지 입금될 경우에만 주문 접수 완료됩니다.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: '500px', width: '100%', my: '1rem' }}>
            <CardHeader
              avatar={<img src={order.image_url} width={120} height={120} />}
              title={<Typography fontWeight={600}>{order.name}</Typography>}
              subheader={
                <>
                  {order.unit} x {order.quantity}개
                  <Typography>{order.price.toLocaleString()}원</Typography>
                </>
              }
            ></CardHeader>
          </Card>

          <Card sx={{ maxWidth: '500px', width: '100%' }}>
            <CardContent
              sx={{
                '& > div ': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                },
              }}
            >
              <Box>
                <Typography variant="body2">총 상품 가격</Typography>
                <Typography variant="subtitle2">14,000원</Typography>
              </Box>
              <Box>
                <Typography variant="body2">총 배송료</Typography>
                <Typography variant="subtitle2">3,000원</Typography>
              </Box>

              <Box>
                <Typography color="warning.main" variant="body2">
                  첫 납품 원두 주문 10,000원 할인
                </Typography>
                <Typography color="warning.main" variant="subtitle2">
                  -10,000원
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  총 결제 금액
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  7,000원
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box
            sx={{
              display: 'flex',
              // flexDirection: { xs: 'column', sm: 'row' },
              margin: '1rem',
              '& > button': {
                margin: '1rem 0.5rem',
              },
            }}
          >
            <Button variant="outlined" onClick={() => router.push('/chat')}>
              주문내역 상세보기
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              다른상품 둘러보기
            </Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
