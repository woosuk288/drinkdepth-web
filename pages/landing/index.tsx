import * as React from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
// import Meta from '../src/Meta';
import { Box } from '@mui/material';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';

import Image from 'next/image';

const Landing: NextPage = () => {
  const metaData = {
    title: '깊이를 마시다',
    description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
    image: '/images/logo_name.png',
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <Box display="flex" flexDirection={'column'}>
        <Image
          src="/images/landing1.png"
          alt="landing-1"
          width={1080}
          height={1920}
          priority
        />

        <Image
          src="/images/landing2.png"
          alt="landing-2"
          width={1080}
          height={1235}
        />

        <Image
          src="/images/landing3.png"
          alt="landing-3"
          width={1080}
          height={1115}
        />

        <NextLink href={'/landing/register'} passHref>
          <Image
            src="/images/landing4.png"
            alt="landing-4"
            width={1080}
            height={533}
            style={{ cursor: 'pointer' }}
          />
        </NextLink>
      </Box>

      <div style={{ marginBottom: '100px' }}></div>
    </Layout>
  );
};

export default Landing;
