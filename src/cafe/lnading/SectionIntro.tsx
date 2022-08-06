import { Box, Typography } from '@mui/material';

function SectionIntro() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingX: '1rem',
      }}
    >
      <span style={{ flex: 1 }}></span>

      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        sx={{
          margin: '0 0 3rem',
          backgroundColor: 'rgba(2, 32, 71, 0.05)',
          padding: '2.5rem 1rem',
          borderRadius: '24px',
        }}
      >
        오늘 뭐 마시지?
      </Typography>

      <Box /* div */ paddingX="1rem">
        {/* <Typography variant="h4">오늘 뭐 마시지?</Typography> */}

        <Typography variant="h6">
          혹시 ＇오늘 뭐 마시지?＇라는 고민 해보신적 없으신가요?
        </Typography>
        <br />
        <br />

        <Typography variant="h6">
          유저들은 음료에 대해서 마셔보고는 싶지만 기존의 경험에 의존하는 경우가
          많습니다. 모험적인 선택을 안하는 편이죠.
        </Typography>
        <br />
        <br />

        <Typography variant="h6">
          하지만 해당 음료에 대한 <b>사전 경험적 요소</b>가 있다면  음료를
          선택할때 더욱 선택지가 넓어지게 됩니다.
        </Typography>
        <br />
        <br />

        {/* <Avatar sx={{ backgroundColor: 'white' }}>
            <QuestionMarkIcon fontSize="large" color="primary" />
          </Avatar> */}
      </Box>

      <span style={{ flex: 1 }}></span>
    </Box>
  );
}
export default SectionIntro;
