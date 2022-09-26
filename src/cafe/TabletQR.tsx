import { Box, Typography } from '@mui/material';
import QRCode from 'react-qr-code';
import { DOMAIN_OFFLINE_QR_TABLET } from 'src/utils/constants';
import { CAFE_PATH } from 'src/utils/routes';

type TabletQRProps = {
  cafeId: string;
  // value: string;
};

function TabletQR({ cafeId }: TabletQRProps) {
  return (
    <Box
      sx={{
        height: '80px',
        position: 'fixed',
        // bottom: '-1rem',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <QRCode
        value={'https://' + DOMAIN_OFFLINE_QR_TABLET + CAFE_PATH + `/${cafeId}`}
        level="H"
        size={50}
      />
      <Typography sx={{ marginLeft: '2rem' }}>
        QR 코드로 쿠폰을 받아보세요.
      </Typography>
    </Box>
  );
}
export default TabletQR;
