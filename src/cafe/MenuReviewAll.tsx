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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { auth } from '../utils/firebase/firebaseInit';

type MenuReviewAllProps = {
  reviews: ReviewType[];
  hasMore: boolean;
};
function MenuReviewAll({ reviews, hasMore }: MenuReviewAllProps) {
  return (
    <List>
      {reviews?.map((review) => (
        // <ListItem alignItems="flex-start" key={review.id}>
        //   <ListItemAvatar>
        //     <Avatar alt={review.displayName} src={review.photoURL} />
        //   </ListItemAvatar>
        //   <ListItemText
        //     primary={
        //       <Fragment>
        //         <Typography
        //           // sx={{ display: 'inline' }}
        //           component="span"
        //           variant="subtitle1"
        //           color="text.primary"
        //           fontWeight="bold"
        //         >
        //           {review.displayName.charAt(0) + '**'}
        //         </Typography>{' '}
        //         {review.text}
        //       </Fragment>
        //     }
        //   />

        //   {auth.currentUser?.uid === review.uid && (
        //     <ListItemSecondaryAction sx={{ top: '16px', transform: 'none' }}>
        //       <IconButton
        //         size="small"
        //         // onClick={() => handleDeleteComment(review.id!)}
        //       >
        //         <CloseIcon fontSize="small" />
        //       </IconButton>
        //     </ListItemSecondaryAction>
        //   )}
        // </ListItem>
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

          {auth.currentUser?.uid === review.uid && (
            <IconButton
              size="small"
              // onClick={() => handleDeleteComment(review.id!)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </ListItem>
      ))}
      <ListItem disablePadding sx={{ justifyContent: 'center' }}>
        <IconButton size="small">
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </ListItem>
    </List>
  );
}
export default MenuReviewAll;
