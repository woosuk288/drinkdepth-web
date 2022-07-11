import { Box, Container } from '@mui/material';
import { NextPage } from 'next';
import { sxCenter } from '../../src/styles/GlobalSx';
import Header from '../../src/cafe/Header';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();

  const handleLoginWithKakao = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = `${window.location.origin}/oauth/kakao`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    router.push(KAKAO_AUTH_URL);
  };

  return (
    <Container maxWidth="sm" disableGutters>
      <Header title="로그인" />
      <Box
        sx={{
          height: '100vh',
          marginTop: '-56px',

          ...sxCenter,
        }}
      >
        <img
          src="/images/btn_kakao_login.png"
          alt="카카오 아이디로 로그인"
          width={'80%'}
          style={{ maxWidth: '300px', cursor: 'pointer' }}
          onClick={handleLoginWithKakao}
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
