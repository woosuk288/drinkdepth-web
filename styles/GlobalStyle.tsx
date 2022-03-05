import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const defaultStyle = css`
  // @import url("<https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap>");

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    // font-family: "Nanum Myeongjo", serif;
  }

  html,
  body {
    height: 100%;

    /* 모바일 수평 스크롤 금지 */
    overflow-x: hidden;

    word-break: keep-all;
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
