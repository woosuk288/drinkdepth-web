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
    </FooterWrapper>
  );
};

export default Footer;
