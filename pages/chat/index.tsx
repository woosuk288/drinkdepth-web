import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { Box } from '@mui/material';
import ChatList from '../../src/chat/ChatList';
import ChatSearch from '../../src/chat/ChatSearch';
import ChatTabs from '../../src/chat/ChatTabs';
import ChatContent from '../../src/chat/ChatContent';

const Chat: NextPage = () => {
  const metaData = {
    title: '깊이를 마시다',
    description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
    image: '/images/logo_name.png',
  };

  return (
    <Layout showFooter={false} sxMain={{ overflow: 'hidden' }}>
      <Meta data={metaData} />

      <Box
        display="flex"
        alignItems="stretch"
        padding="1rem"
        minHeight="600px"
        height="calc(100% - 64px)"
        maxHeight="100vh"
        overflow="hidden"
      >
        <Box maxWidth="400px" border={'1px solid #eee'}>
          <ChatSearch />
          <ChatTabs />
          <ChatList />
        </Box>

        <ChatContent />
      </Box>
    </Layout>
  );
};

export default Chat;
