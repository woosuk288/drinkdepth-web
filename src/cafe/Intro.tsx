import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

import {
  CouponCounterType,
  COUPONS,
  CouponType,
  COUPON_COUNTER_ID,
} from '../utils/firebase/models';
import CouponDialog from './CouponDialog';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { getTestType } from '../utils/combos';
import { sxSquareImg } from '../styles/GlobalSx';

function Intro({ cafeIntro }: CafeIntroProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { user } = useAuth();

  const [coupon, setCoupon] = useState<CouponType | null>();
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
                } as CouponType)
              : null
          )
      );
      return unsubscribe;
    } else {
      setCoupon(null);
    }
  }, [cafeId, user?.uid]);

  const mutation = useMutation<string, string, IssueCouponType>(
    mutationIssueCoupon
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
      mutation.mutate(
        { cafeId, customerId: user.uid },
        {
          onSuccess: (data) => {
            console.log('data : ', data);
          },
        }
      );
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const clipIntroduce = clipText(cafeIntro.introduce);

  return (
    <>
      <Box sx={sxSquareImg}>
        <img className="img" src={cafeIntro.imageURL} alt={cafeIntro.name} />
      </Box>

      <Box
        sx={{
          // display: 'flex',
          // justifyContent: 'space-between',
          position: 'relative',
          padding: '1rem',
        }}
      >
        {expanded ? (
          <Typography whiteSpace="pre-line">
            {cafeIntro.introduce}
            <ExpandMoreIcon
              sx={{ verticalAlign: 'middle', transform: 'rotate(180deg)' }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="hide more"
            />
          </Typography>
        ) : (
          <Typography whiteSpace="pre-line">
            {clipIntroduce}
            {cafeIntro.introduce.length > clipIntroduce.length && (
              <ExpandMoreIcon
                sx={{ verticalAlign: 'middle' }}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              />
            )}
          </Typography>
        )}
        {/* <Box sx={{ textAlign: 'center' }}></Box> */}
      </Box>

      <Box sx={{ margin: '1rem' }}>
        <Button
          onClick={handleOpenNaverMap}
          fullWidth
          // variant="contained"
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
            disabled={mutation.isLoading || coupon === undefined}
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

type IssueCouponType = {
  cafeId: string;
  customerId: string;
};
/**
 * 쿠폰 발행
 * mutationIssueCoupon
 */
function mutationIssueCoupon({ cafeId, customerId }: IssueCouponType) {
  const result = runTransaction(db, async (tx) => {
    const counterRef = doc(db, COUPONS, COUPON_COUNTER_ID);
    const couponDoc = await tx.get(counterRef);

    const total = (couponDoc.data() as CouponCounterType).total;
    const nextCount = total + 1;
    const nextCode = nextCount.toString(10).padStart(6, '0');

    const couponRef = doc(db, COUPONS, nextCode);
    const newCoupon = await tx.get(couponRef);

    const type = getTestType();

    if (newCoupon.exists()) {
      throw '쿠폰을 코드 중복 오류!';
    } else {
      tx.update(counterRef, { total: nextCount });
      tx.set(couponRef, {
        code: nextCode,
        cafeId: cafeId,
        customerId: customerId,
        type,
        isUsed: false,
        createdAt: serverTimestamp(),
      });

      return '쿠폰 발급 완료!';
    }
  });

  return result;
}

const clipText = (text: string) => {
  const MIN_LENGTH = 100;
  const idx = text.indexOf('\n', MIN_LENGTH);

  if (idx === -1 || text.length < MIN_LENGTH) {
    return text;
  } else {
    return text.slice(0, idx);
  }
};
