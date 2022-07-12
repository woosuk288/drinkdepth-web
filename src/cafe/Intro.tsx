import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { makeNaverMapURL } from '../o2o/place/coffeeDetailDialog';
import proj4 from 'proj4';
import { CafeIntroProps } from '../utils/types';
import { db, useAuthFb } from '../utils/firebase/firebaseInit';
import {
  collection,
  doc,
  limit,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentData,
  useFirestoreQueryData,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { COUPONS, COUPON_TYPE } from '../utils/firebase/models';
import CouponDialog from './CouponDialog';
import { useState } from 'react';

function Intro({ cafeIntro }: CafeIntroProps) {
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;

  const [user, loading, error] = useAuthFb();

  const couponQuery = useFirestoreQuery(
    [COUPONS, { uid: user?.uid, cafeId }],
    query(
      collection(db, COUPONS),
      limit(1),
      where('cafeId', '==', cafeId),
      where('customerId', '==', user?.uid ?? null)
    ),
    {
      source: 'server',
      // subscribe: true
    },
    { enabled: !!user }
  );

  const ref = collection(db, COUPONS);
  const mutation = useFirestoreCollectionMutation(ref);

  const [open, setOpen] = useState(false);

  // id 뭐냐
  // const COUPON_COUNTER_ID = '#counter#';
  // const docRef = doc(db, COUPONS, COUPON_COUNTER_ID);
  // const couponCounter = useFirestoreDocumentData(
  //   [COUPONS, COUPON_COUNTER_ID],
  //   docRef, undefined
  //   ,
  //   {enabled: false}
  // );

  // document #counter# 를 가져온다
  // counter를 만들어서 +1을 해준다.
  // create 해준다.
  // 새로 생성된 create 아이디로 조회한다.
  // 조회한 id를 가지고 쿠폰 발행 여부를 확인한다. (userId)
  //
  //

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
      // 쿠폰 발행
      console.log('issue coupon');

      const type = cafeId.replace(/[1-9]/g, '');

      if (type !== 'normal' && type !== 'smart') {
        alert('잘못된 접근입니다.');
        return;
      }

      // coupon counter
      // normal:0, smart: 0
      // 100001 200001
      // left padd

      // '03'.pa;

      // TODO:
      // type = cafeId에서 숫자 부분 제거하여 type으로 넣기...
      // code = #couter#에서 가져와서 type별 number 체크하고

      //
      // type === 'noraml' cafeId에서 숫자 부분을

      console.log('cafeId : ', cafeId);
      const count = '0';
      const nextCount = (parseInt(count, 10) + 1).toString(10);
      const nextCode = nextCount.padStart(6, '0');

      console.log('nextCode : ', nextCode);

      mutation.mutate(
        {
          code: nextCode,
          cafeId: cafeId,
          customerId: user.uid,
          type,
          isUsed: false,
          createdAt: serverTimestamp(),
        },
        {
          onSuccess() {
            console.log('Document added!');
          },
        }
      );
    } else {
      // 쿠폰 정보 recoil 보관
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

  console.log(user, loading, error);

  console.log(
    'couponQuery : ',
    couponQuery.data?.docs.map((doc) => doc.data())
  );

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
        <Typography>
          2002년 서울에서 시작한 나무사이로는 한 잔의 커피로 우리의 일상이
          풍요로워지기를 바랍니다. 지속적으로 산지를 방문하여 농부•생산업자와
          소통하며 좋은 재료와 논리적인 로스팅, 철저한 품질관리를 기반으로
          커피가 가진 다양한 매력을 소개합니다.
        </Typography>
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
          {cafeIntro.addressWithSubway}
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        {couponQuery.data?.size ?? 0 > 0 ? (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: '50%',
              height: 64,
              margin: '1rem',
              fontSize: 20,
              fontWeight: 500,
              borderRadius: 16,
            }}
            onClick={handleUseCoupon}
          >
            쿠폰 사용
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              width: '50%',
              height: 64,
              margin: '1rem',
              fontSize: 20,
              fontWeight: 500,
              borderRadius: 16,
            }}
            onClick={handleIssueCoupon}
            disabled={mutation.isLoading || (couponQuery.data?.size ?? 0) > 0}
          >
            쿠폰 발행
          </Button>
        )}

        {mutation.isError && <p>{mutation.error.message}</p>}

        {open && (couponQuery.data?.size ?? 0) > 0 && (
          <CouponDialog
            coupon={
              {
                id: couponQuery.data!.docs[0].id,
                ...couponQuery.data!.docs[0].data(),
              } as COUPON_TYPE
            }
            open={open}
            handleClose={handleClose}
          />
        )}
      </Box>
    </>
  );
}
export default Intro;
