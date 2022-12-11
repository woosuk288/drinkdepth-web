import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import GlobalStyle from '../src/styles/GlobalStyle';
import { useRouter } from 'next/router';

import {
  CAFE_PATH,
  D_PATH,
  NOT_FOUND_PATH,
  O2O_PATH,
  ROOT_PATH,
} from 'src/utils/routes';

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NotFoundText = styled.div`
  font-size: 150px;
  font-weight: 800;

  @media (max-width: 600px) {
    font-size: 100px;
  }
`;

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const GoToMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;

const NotFoundPage: FunctionComponent = function () {
  const router = useRouter();
  const errorPath = (router.query.previousPath as string) ?? router.asPath;

  const homePath =
    [D_PATH, O2O_PATH, CAFE_PATH].find((pathname) =>
      errorPath.startsWith(pathname)
    ) ?? ROOT_PATH;

  return (
    <NotFoundPageWrapper>
      <GlobalStyle />
      <NotFoundText>404</NotFoundText>
      <NotFoundDescription>
        찾을 수 없는 페이지입니다. <br />
        다른 콘텐츠를 보러 가보시겠어요?
      </NotFoundDescription>

      {/* 403
        {(location.state as any)?.error || '사용자 요청이 거부되었습니다.'}
        <br />
        <br />
        고객센터에 문의해주세요.
      */}
      <GoToMainButton href={homePath}>메인으로</GoToMainButton>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
