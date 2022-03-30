import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import ImageIcon from '@mui/icons-material/Image';

function NotificationList() {
  const handleItemClick = () => {
    console.log('item click');
    // history.push("/sns/timeline");
  };

  return (
    <List>
      <ListItem button onClick={handleItemClick}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={'"날아올라"의 "숲" 샘플 주문 신청'}
          // YOD에서
          //  날아올라의
          secondary={'2021.03.09 목'}
        />
      </ListItem>
    </List>
  );
}

export default NotificationList;
