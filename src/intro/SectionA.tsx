import styled from '@emotion/styled';
import { styled as muiStyled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

const HeroSection = styled.div`
  @media (min-width: 900px) {
    display: flex;
    align-items: center;

    height: calc(100vh - 64px);
  }
`;

// emotion styled과 mui styled 사용법 비교하기 위해 써봄
const VisionWrapper = muiStyled(Box)(({ theme }) => ({
  marginTop: '100px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '80px',
  },
}));

const ImageWrap = styled.div`
  @media (min-width: 900px) {
    flex: 0 0 58%;
    max-width: 58%;
  }
`;

function SectionA() {
  const handleMoveSection = () => {
    const section = document.querySelector('#drinkdepth_o2o_section');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <HeroSection>
      <VisionWrapper>
        <Typography
          variant="h1"
          fontWeight={700}
          sx={(theme) => ({
            fontSize: { xs: '36px' },
            lineHeight: 1.5,
            marginBottom: '24px',
            [theme.breakpoints.down('sm')]: {
              '& p.xs': {
                display: 'inline-block',
              },
            },
          })}
        >
          <Box display={{ xs: 'block', sm: 'none' }}>
            더 이상 나만의 카페를 찾는데 오래 시간 투자하지 마세요
          </Box>
          <Box display={{ xs: 'none', sm: 'block' }}>
            더 이상 나만의 카페를 찾는데 <br /> 오래 시간 투자하지 마세요
          </Box>
        </Typography>
        <Typography
          variant="h6"
          color="InfoText"
          fontWeight={400}
          sx={{
            lineHeight: 1.5,
            maxWidth: '880px',
            marginBottom: '36px',
          }}
        >
          <Box display={{ xs: 'block', sm: 'none' }}>
            별점 기반 이 아닌 취향 기반 및 데이터 기반 개인화된 AI로 카페를 찾는
            당신의 시간과 시행착오를 줄여드립니다.
          </Box>
          <Box display={{ xs: 'none', sm: 'block' }}>
            별점 기반 이 아닌 취향 기반 및 데이터 기반 <br />
            개인화된 AI로 카페를 찾는 당신의 시간과 시행착오를 줄여드립니다.
          </Box>
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            padding: '10px 40px',
            borderRadius: '8px',
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          시작하기
        </Button>
      </VisionWrapper>

      <ImageWrap>
        <Image
          src="/images/main-guy-with-magnifying-glass-F0F0F4.svg"
          alt="hero image"
          width={800}
          height={600}
        />
      </ImageWrap>
    </HeroSection>
  );
}

export default SectionA;
