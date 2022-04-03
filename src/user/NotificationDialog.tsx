import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { NOTIFICATION_QUERY } from '../../apollo/queries';
import {
  notification,
  notificationVariables,
} from '../../apollo/__generated__/notification';
import { SkeletonImage } from '../common/SkeletonImage';

type NotificationDialogProps = {
  id: string;
  open: boolean;
  handleClose: () => void;
};

export default function NotificationDialog({
  id,
  open,
  handleClose,
}: NotificationDialogProps) {
  const { data, loading, error } = useQuery<
    notification,
    notificationVariables
  >(NOTIFICATION_QUERY, { variables: { input: { id } } });

  if (loading)
    return (
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={true}
        sx={{
          '.MuiPaper-root': {
            m: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <CircularProgress />
      </Dialog>
    );
  if (error) return <div>{error.message}</div>;
  if (data?.notification.error) return <div>{data?.notification.error}</div>;

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        sx={{
          '.MuiPaper-root': {
            m: 1,
            height: '100%',
          },
        }}
      >
        <DialogTitle>{data?.notification.product?.title}</DialogTitle>
        <SkeletonImage
          url={data?.notification.product?.image ?? ''}
          alt={data?.notification.product?.title ?? ''}
        />

        <DialogContent>
          <DialogContentText variant="h6">요청자</DialogContentText>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // m: 'auto',
              width: 'fit-content',
            }}
          >
            <Typography>
              상호명 : {data?.notification.senderCompany?.company_name}
            </Typography>
            <Typography>
              대표자성명 : {data?.notification.senderCompany?.president_name}
            </Typography>
            <Typography>
              연락처 : {data?.notification.senderCompany?.telephone}
            </Typography>
          </Box>
        </DialogContent>
        <DialogContent>
          <DialogContentText variant="h6">제조사</DialogContentText>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // m: 'auto',
              width: 'fit-content',
            }}
          >
            <Typography>
              상호명 : {data?.notification.recipientCompany?.company_name}
            </Typography>
            <Typography>
              대표자성명 : {data?.notification.recipientCompany?.president_name}
            </Typography>
            <Typography>
              연락처 : {data?.notification.recipientCompany?.telephone}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
