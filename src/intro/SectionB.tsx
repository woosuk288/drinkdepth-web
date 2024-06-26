import { Box, Button, Typography } from '@mui/material';

function SectionB() {
  const handleRecommandClick = () => {
    const link = 'https://tally.so/r/3jbGK9';

    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  const handleRegisterClick = () => {
    alert('준비 중입니다.');
  };

  return (
    <Box mt="160px">
      <Typography
        // variant="h1"
        fontWeight={700}
        sx={{
          fontSize: { xs: 36, lineHeight: 1.5, marginBottom: '3rem' },
        }}
      >
        왜 우리 서비스를 이용 해야 하나요?
      </Typography>

      <Box sx={sxContent}>
        <Box className="box-item">
          <Typography variant="h4">카페 매니아</Typography>

          <Typography
            // sx={{ display: 'inline' }}
            // component="span"
            variant="h6"
            color="text.secondary"
          >
            카페를 갔는데 실망했던 적 있으신가요? 별점만 보고 갔는데 너무 아쉬운
            적은요? 누군가에겐 최고 일수 있지만 누구에겐 좋지 않은 경험일 수도
            있습니다.
          </Typography>

          <Typography variant="h6" color="text.secondary">
            지금 당장 청량하고 상큼한 음료가 당길 때, 특정 원두의 커피를 좋아할
            때, 부모님과 함께 갈만한 멋진 장소의 카페, 오션뷰에 일하기 좋은 카페
            등 좋아하는 메뉴를 기점으로 탐색하는데 블로그 뒤지고 지도를 뒤져도
            여간 쉽지가 않습니다.
          </Typography>
          <Typography variant="h6" color="text.secondary">
            일단 내 취향에 가장 좋아야죠! <br /> 기존에 검색하기 매우 까다로웠던
            메뉴, 취향, 상황, 어떤 것이든 입력하든 그에 맞는 적합한 결과를
            제공하고자 합니다.
          </Typography>

          <Box marginBottom={{ xs: '6rem', sm: '4rem' }}></Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRecommandClick}
          >
            추천받기
          </Button>
        </Box>

        <span className="span__padding-20"></span>

        <Box className="box-item">
          <Typography variant="h4">카페 사장님</Typography>

          <Typography
            // sx={{ display: 'inline' }}
            // component="span"
            variant="h6"
            color="text.secondary"
          >
            더 이상 마케팅 비용에 투자하지 마세요. 경쟁력에만 투자하세요. 우리가
            잠재 고객들을 연결하겠습니다. 여러분들의 차별화된 가치를 우리에게
            디테일하게 공유해 주세요. 우리가 가치를 찾는 이용자들을 연결해
            드릴게요.
          </Typography>

          <Typography variant="h6" color="text.secondary">
            우리는 생존을 위해 다양한 전략과 가치 제안을 사용하며 유저들에게
            다가가는 카페 사장님들에 대해 깊이 공감하고 응원하고 있습니다.
          </Typography>

          <Typography variant="h6" color="text.secondary">
            우리가 하는 일은 불필요한 비용 부담을 줄여주며 제안하시는 가치
            전달을 유저들이 최대한 놓치지 않게 환경을 구성하여 잠재 고객들을
            연결하는 것이 우리 팀의 미션입니다.
          </Typography>

          <Box marginBottom={{ xs: '6rem', sm: '4rem' }}></Box>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegisterClick}
          >
            등록하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SectionB;

const sxContent = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  '> div': {
    flex: 1,
    borderRadius: '40px',
    padding: { xs: '2rem', sm: '3rem' },
    bgcolor: 'rgba(2, 32, 71, 0.05)',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.75rem',
    marginBottom: '1.25rem',
  },
  h6: {
    marginBottom: '1rem',
  },

  '.span__padding-20': {
    padding: '1.25rem',
  },

  '.box-item': {
    position: 'relative',

    '.MuiButton-root': {
      position: 'absolute',
      right: '48px',
      bottom: '40px',
      fontSize: '16px',
      fontWeight: '600',
      padding: '12px 33px',
      borderRadius: '12px',
    },
  },
};
