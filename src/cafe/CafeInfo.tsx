import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { makeNaverMapURL } from '../o2o/place/coffeeDetailDialog';
import proj4 from 'proj4';
import { db } from 'src/firebase/services';
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import { useMutation } from 'react-query';

import CouponDialog from './CouponDialog';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthUserContext';
import { OATUH_LOGIN_PATH } from '../utils/routes';
import {
  DOMAIN_OFFLINE_QR,
  DOMAIN_OFFLINE_QR_TABLET,
} from '../utils/constants';
import {
  DB_COUPONS,
  issueCoupon,
  checkOpenCoupon,
} from 'src/firebase/services';
import { FirebaseError } from 'firebase/app';
import BannerCarousel from './tablet/BannerCarousel';
import { clipText } from 'src/utils/etc';
import PhoneDialog from './PhoneDialog';

export type CafeInfoProps = {
  cafe: CafeType;
};

function CafeInfo({ cafe }: CafeInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const cafeId = router.query.cafe_id as string;
  const { user } = useAuth();

  // 주의! undefined와 null 처리 각각 다름
  const [coupon, setCoupon] = useState<CouponType | null>();
  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, DB_COUPONS),
          limit(1),
          where('cafeId', '==', cafeId),
          where('customerId', '==', user.uid)
        ),
        (snapshot) => {
          if (snapshot.size > 0) {
            setCoupon({
              ...snapshot.docs[0].data(),
              id: snapshot.docs[0].id,
            } as CouponType);
          } else {
            setOpenPhone(true);
            setCoupon(null);
          }
        }
      );
      return unsubscribe;
    } else {
      setCoupon(null);
    }
  }, [cafeId, user?.uid]);

  const mutation = useMutation(issueCoupon);

  const [open, setOpen] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);

  useEffect(() => {
    if (open && coupon?.code) {
      checkOpenCoupon(coupon?.code);
    }
  }, [open, coupon?.code]);

  const handleOpenNaverMap = () => {
    const p = proj4('EPSG:4326', 'EPSG:3857');
    const position = p.forward([
      parseFloat(cafe.addressX),
      parseFloat(cafe.addressY),
    ]);

    const url = makeNaverMapURL(cafe.name, position);
    // console.log('position : ', position);
    // console.log('url : ', url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  const handleIssueClick = () => {
    if (user && !coupon) {
      setOpenPhone(true);
    } else {
      router.push({
        pathname: OATUH_LOGIN_PATH,
        query: { previousPath: router.asPath },
      });
    }
  };

  const handleIssueCoupon = (phoneNumber: string) => {
    user &&
      mutation.mutate(
        { cafeId, customerId: user.uid, phoneNumber },
        {
          onSuccess: (data) => {
            // console.log('data : ', data);
            setOpenPhone(false);
          },
        }
      );
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

  const clipInfoduce = clipText(cafe.introduce, 100);
  const hostname =
    typeof window !== 'undefined' && window.location.hostname
      ? window.location.hostname
      : '';
  const isFromOffline =
    hostname === DOMAIN_OFFLINE_QR_TABLET || hostname === DOMAIN_OFFLINE_QR
      ? true
      : false;

  return (
    <>
      <BannerCarousel
        imageURLs={isFromOffline ? cafe.imageOfflineURLs : cafe.imageURLs}
      />

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
            {cafe.introduce}
            <ExpandMoreIcon
              sx={{ verticalAlign: 'middle', transform: 'rotate(180deg)' }}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="hide more"
            />
          </Typography>
        ) : (
          <Typography whiteSpace="pre-line">
            {clipInfoduce}
            {cafe.introduce.length > clipInfoduce.length && (
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
          {cafe.address}
        </Button>
        <Typography variant="caption" component="p" align="center">
          {cafe.addressETC}
        </Typography>
      </Box>

      {isFromOffline === false && (
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
              onClick={handleIssueClick}
              disabled={mutation.isLoading || coupon === undefined}
            >
              쿠폰 발행
            </Button>
          )}

          {mutation.isError && (
            <p>
              {typeof mutation.error === 'string'
                ? mutation.error
                : (mutation.error as FirebaseError).message}
            </p>
          )}

          {open && !coupon?.isUsed && (
            <CouponDialog
              coupon={coupon!}
              open={open}
              handleClose={handleClose}
            />
          )}

          {openPhone && (
            <PhoneDialog
              open={openPhone}
              handleClose={() => setOpenPhone(false)}
              handleIssueCoupon={handleIssueCoupon}
            />
          )}
        </Box>
      )}
    </>
  );
}
export default CafeInfo;

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
