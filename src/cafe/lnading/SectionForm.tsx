import { Box, Typography } from '@mui/material';
import Register from './Register';

function SectionForm() {
  return (
    <>
      <Box id="register_form_location" sx={{ paddingX: '1rem' }}>
        <Typography
          variant="h4"
          fontWeight={'bold'}
          align="center"
          marginTop="3rem"
        >
          드링크뎁스에 <div>솔루션 신청하기</div>
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{ marginTop: '2rem', marginBottom: '0.5rem' }}
        >
          협업하실 소수 파트너 카페를 모집합니다.
          <div>{`<기간 ~부터 ~ (00일 발표)>`}</div>
          <div>{`선별 후 개별 연락`}</div>
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{ marginTop: '2rem', marginBottom: '0.5rem' }}
        >
          특별한 메뉴를 보유한 경쟁력 있는 카페라면?
          <div>아래 양식에 남겨주세요.</div>
        </Typography>
      </Box>

      <Register />
    </>
  );
}
export default SectionForm;
