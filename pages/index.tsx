import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../src/Layout';
import SectionA from '../src/intro/SectionA';
import Meta from '../src/common/Meta';
import SectionB from '../src/intro/SectionB';
// import SectionC from '../src/intro/SectionC';
import { Box } from '@mui/material';
import ChannelTalk from 'src/common/ChannelTalk';

const metaData = {
  title: '드링크뎁스',
  description:
    '오늘도 뭘 마실지 고민될 땐? 드링크뎁스는 ‘마시다’라는 영역에서 보다 더 나은 경험을 만들기 위해 끊임없이 노력합니다.',
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
        {/* <SectionC /> */}
      </Box>

      <div style={{ marginBottom: '100px' }}></div>

      <ChannelTalk />
    </Layout>
  );
};

export default Home;
