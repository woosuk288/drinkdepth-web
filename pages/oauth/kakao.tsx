import { Box, CircularProgress, Typography } from '@mui/material';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { sxCenter } from '../../src/styles/GlobalSx';
import { PATH_AFTER_LOGIN } from '../../src/utils/constants';

import { OATUH_KAKAO_PATH } from 'src/utils/routes';
import Meta from 'src/common/Meta';

const metaData = {
  title: `카카오 로그인`,
  description: 'DrinkDepth 카카오 로그인',
  image: '/images/logo_icon.png',
  canonical: `${OATUH_KAKAO_PATH}`,
};

const Auth = () => {
  const router = useRouter();
  const { code } = router.query;

  React.useEffect(() => {
    const redirectWithKakao = async (authorize_code: string) => {
      const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
      const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
      if (!client_id || !client_secret) {
        alert('KEY를 확인하세요.');
        return;
      }

      const redirect_uri = `${window.location.origin}/oauth/kakao`;

      const params = new URLSearchParams();
      params.set('grant_type', 'authorization_code');
      params.set('client_id', client_id);
      params.set('redirect_uri', redirect_uri);
      params.set('code', authorize_code);
      params.set('client_secret', client_secret);

      const payload = params.toString();

      // console.log('payload : ', payload);

      try {
        // access token 가져오기
        const res = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST', // *GET, POST, PUT, DELETE 등
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload,
        }).then((response) => response.json());

        // console.log("res : ", res);

        // firebaseCustomToken 받기
        const result: { firebase_token: string } = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/kakao/verifyToken`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: res.access_token,
            }),
          }
        ).then((response) => response.json());

        // console.log('result : ', result);

        if (!result.firebase_token) {
          alert('로그인 처리 중 오류 발생!');
          router.back();
          return;
        }

        // 받아온 토큰으로 client에서 로그인
        const auth = getAuth();
        const userCredential = await signInWithCustomToken(
          auth,
          result.firebase_token
        );

        // console.log('userCredential : ', userCredential);

        const path = localStorage.getItem(PATH_AFTER_LOGIN);

        router.replace(path ?? '/');
      } catch (err) {
        console.log(err);
        // console.log('err : ', err.code);
        // console.log('err : ', err.message);
        alert('로그인 처리 중 오류가 발생했습니다.');
        router.back();
        return;
      }
    };

    code && redirectWithKakao(code as string);
  }, [code, router]);

  // console.log('code : ', code);

  return (
    <>
      <Meta data={metaData} />
      <Box sx={{ ...sxCenter, height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ marginTop: '1rem' }}>로그인 처리 중...</Typography>
      </Box>
    </>
  );
};

export default Auth;
