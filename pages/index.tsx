import * as React from 'react';
import type { NextPage } from 'next';

// import Meta from '../src/Meta';
import { Box } from '@mui/material';
import Layout from '../src/Layout';
import Meta from '../src/Meta';

import Image from 'next/image';
import Register from '../src/landing/register';
import * as fbq from '../facebook/fpixel';

const metaData = {
  title: '깊이를 마시다',
  description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
  image: '/images/logo_name.png',
};

const Landing: NextPage = () => {
  // handleScroll.js
  const handleScroll = (e: any) => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    fbq.event('Schedule', { event_name: '사전 알림 신청 이미지 클릭' });
  };

  return (
    <Layout>
      <Meta data={metaData} />

      <Box display="flex" flexDirection={'column'}>
        <Register />

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

        <Image
          src="/images/landing4.png"
          alt="landing-4"
          width={1080}
          height={533}
          style={{ cursor: 'pointer' }}
          onClick={handleScroll}
        />
      </Box>

      <a
        href="https://pf.kakao.com/_ktxnJb/chat"
        target="_blank"
        style={{ position: 'fixed', right: 20, bottom: 10, zIndex: 100 }}
        rel="noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/btn_kakao.png"
          alt="카카오톡투명로고"
          width={56}
          height={56}
        />
      </a>

      <div style={{ marginBottom: '100px' }}></div>
    </Layout>
  );
};

export default Landing;
