import { Box, Typography } from '@mui/material';
import { KakaoShareButton } from '../../landing/KakaoShareButton';

function KakaoShare() {
  return (
    <Box
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      sx={{ cursor: 'pointer', marginTop: '5rem' }}
      id="kakao-link-btn"
    >
      <KakaoShareButton
        url={'https://drinkdepth.com'}
        iconStyle={{ fontSize: '3rem' }}
      />
      <Typography variant="h6" sx={{ marginLeft: '1rem', color: '#3A2929' }}>
        공유하기
      </Typography>
    </Box>
  );
}
export default KakaoShare;
