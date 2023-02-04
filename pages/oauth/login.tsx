import { Box, Container, LinearProgress } from '@mui/material';
import { NextPage } from 'next';
// import Header from '../../src/cafe/B2BHeader';
import { useRouter } from 'next/router';
import { OATUH_LOGIN_PATH } from 'src/utils/routes';
import Meta from 'src/common/Meta';
import { useSigninCheck } from 'reactfire';
import BackPage from 'src/common/BackPage';
import { PATH_AFTER_LOGIN } from 'src/utils/constants';
import { sxCenter } from 'src/styles/GlobalSx';

const metaData = {
  title: `로그인`,
  description: 'DrinkDepth 로그인 화면입니다.',
  image: '/images/logo_icon.png',
  canonical: `${OATUH_LOGIN_PATH}`,
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const prevPath = router.query.previousPath as string;
  const { status, data: signInCheckResult } = useSigninCheck();

  const handleLogoClick = () => {
    const homePath = ['/d', '/cafe', '/o2o', '/'].find((path) =>
      prevPath.startsWith(path)
    );
    if (homePath) {
      router.push(homePath);
    }
  };

  const handleLoginWithKakao = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI = `${window.location.origin}/oauth/kakao`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    localStorage.setItem(PATH_AFTER_LOGIN, prevPath);

    router.push(KAKAO_AUTH_URL);
  };

  if (!prevPath) return <div>문제가 발생했습니다.</div>;
  if (status === 'loading') return <LinearProgress />;
  if (signInCheckResult.signedIn === true) return <BackPage />;

  return (
    <Container maxWidth="sm" disableGutters>
      {/* <Header title="로그인" /> */}
      <Meta data={metaData} />

      <div css={{ height: '100vh', ...sxCenter }}>
        <div
          css={{ display: 'flex', marginBottom: '3rem', height: '50px' }}
          onClick={handleLogoClick}
        >
          <img src="/images/logo_icon.png" alt="logo_icon" height={50} />
          <img
            style={{ marginLeft: '-1rem' }}
            src="/images/logo_name.png"
            alt="logo_name"
            height={50}
          />
        </div>

        <div>
          <img
            src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_large_wide.png"
            alt="login with kakao"
            width={'100%'}
            style={{ maxWidth: '320px', padding: '1rem', cursor: 'pointer' }}
            onClick={handleLoginWithKakao}
            className="gtm-login-with-kakao"
          />
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
