import * as React from 'react';
import type { NextPage } from 'next';

import HeaderD from 'src/d/HeaderD';

import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import AuthContainer from 'src/d/AuthContainer';
import { NextLinkComposed } from 'src/common/Link';
import { CREATE_PATH } from 'src/utils/routes';
import Main from 'src/d/Main';
import ReviewForm from 'src/d/ReviewForm';

const CreatePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo title="DrinkDepth | 리뷰 생성" />
      <AuthContainer>
        <HeaderD
          leftIcon="back"
          centerComponent={
            <Typography fontWeight={'bold'}>새로운 리뷰</Typography>
          }
          rightIcon={
            <Button
              sx={{
                fontSize: 16,
                fontWeight: 600,
                padding: 0,
                marginLeft: '0.75rem',
                minWidth: '36px',
                width: '36px',
                lineHeight: '1.2rem',
              }}
              component={NextLinkComposed}
              to={CREATE_PATH}
              shallow={true}
            >
              생성완료
            </Button>
          }
        />

        <Main>
          <ReviewForm />
        </Main>
      </AuthContainer>
    </>
  );
};

export default CreatePage;
