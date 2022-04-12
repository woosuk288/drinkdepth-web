import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

type MessageProps = {
  direction?: 'left' | 'right';
  text?: string;
  button?: React.ReactNode;
};
function Message({ direction = 'left', text, button }: MessageProps) {
  return (
    <List>
      <ListItem
        disablePadding
        alignItems="flex-start"
        sx={{
          width: 'fit-content',
          marginLeft: direction === 'right' ? 'auto' : 'initial',
          maxWidth: { xs: '300px', sm: '400px' },
        }}
      >
        {direction === 'left' && (
          <ListItemAvatar>
            <Avatar>김</Avatar>
          </ListItemAvatar>
        )}
        <ListItemText
          primary={
            direction === 'left' && (
              <Typography variant="subtitle2" color="text.secondary">
                김사장
              </Typography>
            )
          }
          secondary={
            <Box
            // marginLeft={direction === 'right' ? 'auto' : 'initial'}
            // maxWidth={{ xs: '300px', sm: '400px' }}
            >
              {button && <Button variant="contained">{button}</Button>}

              {text && (
                <List sx={{ bgcolor: 'background.paper' }}>
                  <ListItem>
                    <Typography variant="body1">{text}</Typography>
                  </ListItem>
                </List>
              )}
            </Box>
          }
        />
      </ListItem>
    </List>
  );
}

export default Message;
