import { Box, Button, Typography } from '@mui/material';
import { sxCenter } from '../../styles/GlobalSx';

type SectionGradientProps = {
  handleScroll: () => void;
};

function SectionGradient({ handleScroll }: SectionGradientProps) {
  return (
    <Box
      marginTop="3rem"
      padding="100px 1rem"
      sx={{
        background:
          'linear-gradient(to bottom, rgba(106,215,255,1) 0%, rgba(79,156,255,0.7) 30%, rgba(0,0,0,0) 100%)',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={'bold'}
        align="center"
        color="white"
        sx={{ marginBottom: '3rem' }}
      >
        제공 혜택
      </Typography>

      <Box
        sx={{
          bgcolor: '#F2F4F6',
          borderRadius: '50%',
          margin: '1rem auto',
          // marginRight: { sm: '3rem' },
          // marginBottom: { xs: '1rem', sm: 0 },
          width: '300px',
          height: '300px',
          cursor: 'pointer',
          ...sxCenter,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          모바일 기반 메뉴판 제작
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: '#F2F4F6',
          borderRadius: '50%',
          margin: '1rem auto',
          // marginRight: { sm: '3rem' },
          // marginBottom: { xs: '1rem', sm: 0 },
          width: '300px',
          height: '300px',
          cursor: 'pointer',
          ...sxCenter,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center">
          신규고객 유치를 위한
          <br />
          지역광고 노출
        </Typography>
      </Box>
      {/* <Typography variant="h5" fontWeight={'bold'} align="center" color="white">
        개성있는 메뉴판으로 손님에게 특별한 가치를 공유하고 싶으시다면?
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="white"
        sx={{ marginTop: '2rem' }}
      >
        드링크뎁스를 이용해보세요!
      </Typography> */}

      <Box marginTop="3rem" textAlign="center">
        <Button
          variant="contained"
          sx={{
            padding: ' 1rem 2rem',
            borderRadius: '30px',
            fontSize: '1.25rem',
          }}
          onClick={handleScroll}
        >
          250만원 상당
        </Button>
      </Box>
    </Box>
  );
}
export default SectionGradient;
