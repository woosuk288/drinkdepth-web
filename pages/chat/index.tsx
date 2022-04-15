import * as React from 'react';
import type { NextPage } from 'next';
import Layout from '../../src/Layout';
import Meta from '../../src/Meta';
import { Box, useMediaQuery } from '@mui/material';
import ChatList from '../../src/chat/ChatList';
import ChatSearch from '../../src/chat/ChatSearch';
import ChatTabs from '../../src/chat/ChatTabs';
import ChatContent from '../../src/chat/ChatContent';
import { useTheme } from '@mui/material/styles';

const metaData = {
  title: '깊이를 마시다',
  description: '마시는 경험이 바뀌면 인생의 깊이가 달라집니다.',
  image: '/images/logo_name.png',
};

const Chat: NextPage = () => {
  const [isChatContent, setIsChatContent] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleShowContent = (id: string) => {
    setIsChatContent(true);
  };
  const handleHideContent = () => {
    setIsChatContent(false);
  };

  console.log('isMobile : ', isMobile);
  return (
    <Layout showFooter={false} sxMain={{ overflow: 'hidden' }}>
      <Meta data={metaData} />

      <Box
        display="flex"
        alignItems="stretch"
        padding={isMobile ? 0 : '1rem'}
        minHeight="600px"
        height="calc(100% - 64px)"
        maxHeight="100vh"
        overflow="hidden"
      >
        {/* mobile 일 때 처음 show */}
        {/* desktop 일 때 항상 보임 */}
        {!isMobile && (
          <>
            <Box width="100%" maxWidth="400px" border={'1px solid #eee'}>
              <ChatSearch />
              <ChatTabs />
              <ChatList handleShowContent={handleShowContent} />
            </Box>

            <ChatContent handleHideContent={handleHideContent} />
          </>
        )}
        {isMobile &&
          (!isChatContent ? (
            <Box width="100%" maxWidth="400px" border={'1px solid #eee'}>
              <ChatSearch />
              <ChatTabs />
              <ChatList handleShowContent={handleShowContent} />
            </Box>
          ) : (
            <ChatContent handleHideContent={handleHideContent} />
          ))}
      </Box>
    </Layout>
  );
};

export default Chat;
