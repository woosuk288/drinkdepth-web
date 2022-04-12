import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import ChatCard from './ChatCard';
import ChatInput from './ChatInput';

function ChatContent() {
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem
          secondaryAction={
            <Button variant="contained" color="inherit">
              완료
            </Button>
          }
        >
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

      <Paper elevation={0} sx={{ height: '100%', bgcolor: '#eee' }}>
        <div style={{ padding: '0.5rem' }} />

        <Box maxWidth="sm" marginX="auto">
          <ChatCard />
          <Button variant="contained" sx={{ marginTop: '1rem' }}>
            배송지 입력
          </Button>
        </Box>
      </Paper>

      <ChatInput />
    </>
  );
}

export default ChatContent;
