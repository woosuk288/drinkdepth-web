import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import ChatCard from './ChatCard';
import ChatInput from './ChatInput';
import Message from './Message';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ChatContentProps = {
  handleHideContent: () => void;
};
function ChatContent({ handleHideContent }: ChatContentProps) {
  return (
    <Box
      maxWidth="800px"
      width="100%"
      display="flex"
      flexDirection="column"
      border={'1px solid #eee'}
    >
      <List sx={{ bgcolor: 'background.paper' }}>
        <ListItem
          secondaryAction={
            <Button variant="contained" color="inherit">
              완료
            </Button>
          }
        >
          <ListItemIcon
            onClick={handleHideContent}
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar>김</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography component="span" marginRight={'0.5rem'}>
                  김사장
                </Typography>
                <Typography component="span" variant="body2">
                  여셧시오븐
                </Typography>
              </>
            }
            secondary={
              <Typography component="div" variant="body2" noWrap>
                상품 날아올라 1kg x 1개
              </Typography>
            }
          />
        </ListItem>
      </List>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          bgcolor: '#eee',
          overflowY: 'scroll',
          // msOverflowStyle: 'auto',
          // WebkitOverflowScrolling: 'auto',

          '&::-webkit-scrollbar': {
            display: 'block',
            width: '10px',
            overflow: 'auto',
          },
          '&::-webkit-scrollbar-thumb': {
            /*  스크롤  */
            backgroundColor: '#ccc',
            borderRadius: '30px',
          },
        }}
      >
        <Box maxWidth="sm" marginX="auto" marginY="0.5rem">
          <ChatCard />
          <Message direction="right" button={'입금 확인'} />
          <Message
            direction="right"
            text={'입금 완료되었습니다. 며칠 내로 배송됩니다.'}
          />
          {/* <Message text="국민은행 1230000456789로 33,000원 입금 완료했습니다." /> */}
          <Message direction="right" button={'운송장 입력'} />
          <Message
            direction="right"
            text="운송장 번호 1029384756로 배송이 시작되었습니다."
          />
          <Message text="상품 수령 후 거래 완료 버튼을 클릭했습니다." />
        </Box>
      </Paper>

      <ChatInput />
    </Box>
  );
}

export default ChatContent;
