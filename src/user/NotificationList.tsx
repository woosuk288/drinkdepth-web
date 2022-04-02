import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  LinearProgress,
} from '@mui/material';

import EggIcon from '@mui/icons-material/Egg';
import EggOutlinedIcon from '@mui/icons-material/EggOutlined';

import { useMutation, useQuery } from '@apollo/client';
import { NOTIFICATIONS_QUERY } from '../../apollo/queries';
import { notifications } from '../../apollo/__generated__/notifications';
import { notiBadgeVar, userVar } from '../../apollo/client';
import { UPDATE_NOTIFICATIONS_MUTATION } from '../../apollo/mutations';
import {
  updateNotification,
  updateNotificationVariables,
} from '../../apollo/__generated__/updateNotification';
import NotificationDialog from './NotificationDialog';
import React, { useState } from 'react';

function NotificationList() {
  const user = userVar();

  const [updateNotifications] = useMutation<
    updateNotification,
    updateNotificationVariables
  >(UPDATE_NOTIFICATIONS_MUTATION);

  const { data, loading, error } = useQuery<notifications>(
    NOTIFICATIONS_QUERY,
    {
      onCompleted: (result) => {
        if (result.notifications.ok) {
          notiBadgeVar(false);

          const willRead =
            result.notifications.notifications
              ?.filter((n) => n.read === false && user?.uid === n.recipient_id)
              .map((n) => n.id) ?? [];

          if (willRead.length > 0) {
            updateNotifications({
              variables: {
                input: {
                  ids: willRead,
                },
              },
            });
          }
        }
      },
    }
  );

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>();

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
  };

  if (loading) return <LinearProgress />;

  return (
    <List>
      {data?.notifications.notifications?.map((n) => (
        <ListItem button onClick={() => handleClickOpen(n.id)} key={n.id}>
          <ListItemIcon>
            {n.sender_id === user?.company_id ? (
              <EggIcon color="primary" fontSize="large" />
            ) : (
              <EggOutlinedIcon color="primary" fontSize="large" />
            )}
          </ListItemIcon>
          <ListItemText
            primary={n.message}
            secondary={new Date(n.created_at).toLocaleString()}
          />
        </ListItem>
      ))}
      {open && id && (
        <NotificationDialog id={id} open={open} handleClose={handleClose} />
      )}
    </List>
  );
}

export default NotificationList;
