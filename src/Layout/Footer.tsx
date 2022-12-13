import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';

const FooterWrapper = styled.footer`
  display: grid;
  min-height: 100px;
  place-items: center;
  margin-top: auto;
  padding: 30px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 600px) {
    padding: 20px 0;
  }
`;

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink
          underline="hover"
          color="inherit"
          href="https://drinkdepth.com/"
        >
          (주)드링크뎁스
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ padding: '2rem 1rem' }}
      >
        요드(YOD) 개발책임자 양우석 | 주소 : 경상남도 창원시 마산회원구 내서읍
        광려북천로 198-2, 1층 169호 월드비즈타운 | 사업자등록번호 : 894-15-01596
      </Typography>
    </FooterWrapper>
  );
};

export default Footer;
