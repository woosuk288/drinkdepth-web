import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { InfiniteData } from 'react-query';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

type MenuReviewAllProps = {
  data: InfiniteData<ReviewType[]>;
  handleDeleteReview: (reviewId: string) => void;
};
function MenuReviewAll({ data, handleDeleteReview }: MenuReviewAllProps) {
  const { user } = useFirebaseAuth();

  return (
    <List>
      {data.pages.map((group) =>
        group.map((review) => (
          <ListItem key={review.id}>
            <Typography
              fontWeight="bold"
              component="span"
              sx={{ marginRight: '1rem' }}
            >
              {review.displayName.charAt(0) + '**'}
            </Typography>
            <Typography sx={{ flex: 1 }} noWrap>
              {review.text}
            </Typography>

            {user?.uid === review.uid && (
              <IconButton
                size="small"
                onClick={() => handleDeleteReview(review.id!)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </ListItem>
        ))
      )}
    </List>
  );
}
export default MenuReviewAll;

{
  /* <ListItem alignItems="flex-start" key={review.id}>
          <ListItemAvatar>
            <Avatar alt={review.displayName} src={review.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Fragment>
                <Typography
                  // sx={{ display: 'inline' }}
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {review.displayName.charAt(0) + '**'}
                </Typography>{' '}
                {review.text}
              </Fragment>
            }
          />

          {auth.currentUser?.uid === review.uid && (
            <ListItemSecondaryAction sx={{ top: '16px', transform: 'none' }}>
              <IconButton
                size="small"
                // onClick={() => handleDeleteComment(review.id!)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem> */
}
