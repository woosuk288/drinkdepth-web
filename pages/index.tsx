import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/Layout';
import SectionA from '../src/intro/SectionA';
import Meta from '../src/common/Meta';
import SectionB from '../src/intro/SectionB';
import SectionC from '../src/intro/SectionC';
import { Box } from '@mui/material';
import ChannelTalk from 'src/common/ChannelTalk';

const metaData = {
  title: '드링크뎁스',
  description:
    '카페 갔는데 실망했던 적 없으신가요? 별점 기반이 아닌 개인 취향에 맞는 당신만의 카페를 찾아드립니다.',
  image: '/images/logo_name_og.png',
  canonical: '',
};

// 태그 정리하기

const Home: NextPage = () => {
  return (
    <Layout>
      <Meta data={metaData} />

      <Box px={{ xs: '20px', lg: 0 }}>
        <SectionA />
        <SectionB />
        <SectionC />
      </Box>

      <div style={{ marginBottom: '100px' }}></div>

      <ChannelTalk />
    </Layout>
  );
};

export default Home;
