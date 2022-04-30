import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Badge, Divider, Typography } from '@mui/material';

type ChatListProps = {
  handleShowContent: (id: string) => void;
};

function ChatList({ handleShowContent }: ChatListProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', paddingTop: 0 }}>
      {chatRooms.map((room, i) => (
        <div key={i}>
          <Divider />
          <ListItem button onClick={() => handleShowContent(room.id)}>
            <ListItemAvatar>
              <Badge
                color="secondary"
                variant={room.isBadge ? 'dot' : undefined}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <Avatar>{room.name.charAt(0)}</Avatar>
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component="span" marginRight={'0.5rem'}>
                    {room.name}
                  </Typography>
                  <Typography component="span" variant="body2">
                    {room.company_name}
                  </Typography>
                </>
              }
              secondary={
                <Typography component="div" variant="body2" noWrap>
                  {room.updated_at} — {room.last_message}
                </Typography>
              }
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
}

export default ChatList;

const chatRooms = [
  {
    id: 'kim',
    name: '김사장',
    company_name: '여섯시오븐',
    updated_at: new Date('2014-01-09').toLocaleDateString(),
    last_message: `I'll be in your neighborhood doing errands this`,
    isBadge: true,
  },
  {
    id: 'lee',
    name: '이사장',
    company_name: '달콤',
    updated_at: new Date('2014-01-07').toLocaleDateString(),
    last_message: `Wish I could come, but I'm out of town this`,
    isBadge: true,
  },
  {
    id: 'park',
    name: '박사장',
    company_name: '돌담콩',
    updated_at: new Date('2014-07-20').toLocaleDateString(),
    last_message: `Do you have Paris recommendations? Have you ever`,
    isBadge: false,
  },
];
