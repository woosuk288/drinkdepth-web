import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

type SectionMainProps = {
  handleScroll: () => void;
};

function SectionMain({ handleScroll }: SectionMainProps) {
  return (
    <Box
      height="calc(100vh - 56px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      paddingX="1rem"
    >
      {/* <span style={{ flex: 1 }} /> */}
      <Typography
        variant="h3"
        align="center"
        // color="primary"
      >
        유저를 부르는 <br />{' '}
        <span style={{ fontWeight: 'bold' }}>특별한 메뉴판</span>
      </Typography>

      <Typography
        variant="h5"
        align="center"
        sx={{ marginTop: '3rem', marginBottom: '0.5rem' }}
      >
        우리 카페만의 유저 친화적인
        <br /> 음료 전문 메뉴판을 도입해보세요.
      </Typography>
      {/* <Typography variant="h6" align="center">
        국내 유명 로스터리들의 개성있고 특별한 원두를 최저가로 도입해 보세요.
      </Typography> */}

      <Box sx={{ width: '50%', maxWidth: '280px', marginX: 'auto' }}>
        <Image
          src="/images/o2o/landing_menu.png"
          alt="menu"
          width={800}
          height={800}
        />
      </Box>

      {/* <span style={{ flex: 1 }} /> */}
      <Box textAlign="center">
        <Button
          variant="contained"
          sx={{
            padding: ' 1rem 3rem',
            borderRadius: '30px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
          onClick={handleScroll}
        >
          지금 바로 신청하기
        </Button>
      </Box>
      {/* <span style={{ flex: 1 }} /> */}
    </Box>
  );
}
export default SectionMain;
