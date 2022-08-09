import { Box, Typography } from '@mui/material';
import Image from 'next/image';

function SectionIntro() {
  return (
    <Box
      sx={{
        // minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingX: '1rem',
        marginTop: '5rem',
      }}
    >
      <span style={{ flex: 1 }}></span>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          borderRadius: '24px',
        }}
      >
        혹시 음료 메뉴별 <br />
        <span style={{ fontWeight: 'bold' }}>매출 편차</span>가 크신가요?
      </Typography>

      <Typography variant="h6" align="center">
        메뉴에 대한 가치 전달이
        <br />
        제대로 안된건 아닐까요?
      </Typography>

      <Box sx={{ width: '50%', marginX: 'auto' }}>
        <Image
          src="/images/o2o/landing_drink.png"
          alt="two_drink"
          width={800}
          height={800}
        />
      </Box>

      <Box
        sx={{
          marginTop: '4rem',
          padding: '1rem',
          display: 'flex',
          '> h4 + h4': { color: 'red' },
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ marginX: '1rem' }}>
          맛
        </Typography>
        <Image
          src="/images/o2o/landing_yellow_check.png"
          alt="two_drink"
          width={400}
          height={400}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ marginX: '1rem', flexShrink: 0 }}
        >
          건강
        </Typography>
        <Image
          src="/images/o2o/landing_yellow_check.png"
          alt="two_drink"
          width={400}
          height={400}
        />

        <Typography variant="h4" fontWeight="bold" sx={{ marginX: '1rem' }}>
          향
        </Typography>
        <Image
          src="/images/o2o/landing_yellow_check.png"
          alt="two_drink"
          width={400}
          height={400}
        />
      </Box>

      <Typography variant="h6" align="center">
        음료는 선호하는 맛, 건강 때문에, 선호하는 향, 못먹는 재료 등 음료는
        개인의 우선순위 선택지에 따라 다양한 가중치가 존재합니다.
      </Typography>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          marginTop: '6rem',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>시행 착오를</span> 줄여줄 만한{' '}
        <br />
        <span style={{ fontWeight: 'bold' }}>가치전달</span>이 필수입니다.
      </Typography>

      <Typography variant="h6" align="center">
        메뉴판이 친절하지 않다면 음료에 대해 마셔보고는 싶지만 기존 경험에
        의존하는 경우가 많습니다.
      </Typography>

      <span style={{ flex: 1 }}></span>
    </Box>
  );
}
export default SectionIntro;
