import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { makeNaverMapURL } from '../o2o/place/coffeeDetailDialog';
import proj4 from 'proj4';
import { CafeIntroProps } from '../utils/types';
import { db } from '../utils/firebase/firebaseInit';
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from 'firebase/firestore';

import { useMutation } from 'react-query';

import { COUPONS, COUPON_TYPE } from '../utils/firebase/models';
import CouponDialog from './CouponDialog';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { getTestType } from '../utils/combos';

function Intro({ cafeIntro }: CafeIntroProps) {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { user } = useAuth();

  const [coupon, setCoupon] = useState<COUPON_TYPE | null>(null);
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, COUPONS),
          limit(1),
          where('cafeId', '==', cafeId),
          where('customerId', '==', user.uid)
        ),
        (snapshot) =>
          setCoupon(
            snapshot.size > 0
              ? ({
                  ...snapshot.docs[0].data(),
                  id: snapshot.docs[0].id,
                } as COUPON_TYPE)
              : null
          )
      );
      return unsubscribe;
    }
  }, [cafeId, user?.uid]);

  const mutation = useMutation<string, string>(
    () => {
      const result = runTransaction(db, async (tx) => {
        const counterRef = doc(db, COUPONS, '#counter#');
        const couponDoc = await tx.get(counterRef);

        const count: string = couponDoc.data()?.count;
        const nextCount = (parseInt(count, 10) + 1).toString(10);
        const nextCode = nextCount.padStart(6, '0');

        const couponRef = doc(db, COUPONS, nextCode);
        const newCoupon = await tx.get(couponRef);

        const type = getTestType();

        if (newCoupon.exists()) {
          throw '쿠폰을 코드 중복 오류!';
        } else {
          tx.update(counterRef, { count: nextCount });
          tx.set(couponRef, {
            code: nextCode,
            cafeId: cafeId,
            customerId: user!.uid,
            type,
            isUsed: false,
            createdAt: serverTimestamp(),
          });

          return '쿠폰 발급 완료!';
        }
      });

      return result;
    },
    {
      onSuccess: (data) => {
        console.log('data : ', data);
      },
    }
  );

  const [open, setOpen] = useState(false);

  const handleOpenNaverMap = () => {
    const p = proj4('EPSG:4326', 'EPSG:3857');
    const position = p.forward([
      parseFloat(cafeIntro.addressX),
      parseFloat(cafeIntro.addressY),
    ]);

    const url = makeNaverMapURL(cafeIntro.name, position);
    // console.log('position : ', position);
    // console.log('url : ', url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  const handleIssueCoupon = () => {
    if (user) {
      mutation.mutate();
      return;
    } else {
      // TODO: 쿠폰 정보 recoil 보관
      router.push('/oauth/login');
    }
  };

  const handleUseCoupon = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '100%',
          },
          ' .img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <img
          className="img"
          src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="cafe_name"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <Typography>{cafeIntro.introduce}</Typography>
      </Box>

      <Box sx={{ margin: '1rem' }}>
        <Button
          onClick={handleOpenNaverMap}
          fullWidth
          // variant="contained"
          size="small"
          color="inherit"
          startIcon={<LocationOnIcon color="primary" />}
        >
          {cafeIntro.address}
        </Button>
        <Typography variant="caption" component="p" align="center">
          {cafeIntro.addressETC}
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        {coupon ? (
          <Button
            variant="contained"
            color="secondary"
            sx={sx.btnCoupon}
            onClick={handleUseCoupon}
            disabled={coupon.isUsed}
          >
            쿠폰 사용
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={sx.btnCoupon}
            onClick={handleIssueCoupon}
            disabled={mutation.isLoading}
          >
            쿠폰 발행
          </Button>
        )}

        {mutation.isError && <p>{mutation.error}</p>}

        {open && !coupon?.isUsed && (
          <CouponDialog
            coupon={coupon!}
            open={open}
            handleClose={handleClose}
          />
        )}
      </Box>
    </>
  );
}
export default Intro;

const sx = {
  btnCoupon: {
    width: '50%',
    height: 64,
    margin: '1rem',
    fontSize: 20,
    fontWeight: 500,
    borderRadius: 16,
  },
};
