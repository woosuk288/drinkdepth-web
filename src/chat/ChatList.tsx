import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';

function ChatList() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', paddingTop: 0 }}>
      <Divider />
      <ListItem button>
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
              Jan 9, 2014 — I'll be in your neighborhood doing errands this
            </Typography>
          }
        />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>이</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography component="span" marginRight={'0.5rem'}>
                이사장
              </Typography>
              <Typography component="span" variant="body2">
                달콤
              </Typography>
            </>
          }
          secondary={
            <Typography component="div" variant="body2" noWrap>
              Jan 7, 2014 — Wish I could come, but I'm out of town this
            </Typography>
          }
        />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemAvatar>
          <Avatar>박</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography component="span" marginRight={'0.5rem'}>
                박사장
              </Typography>
              <Typography component="span" variant="body2">
                돌담콩
              </Typography>
            </>
          }
          secondary={
            <Typography component="div" variant="body2" noWrap>
              July 20, 2014 — Do you have Paris recommendations? Have you ever
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}

export default ChatList;
