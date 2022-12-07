import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CoffeeIcon from '@mui/icons-material/Coffee';

import { customIcons } from './RadioGroupRating';
import Link from 'src/common/Link';
import { REVIEW_PATH } from 'src/utils/routes';

type Props = {
  review: CafeMenuReviewType;
};
function Review({ review }: Props) {
  return (
    <Card
      /* variant="outlined" */
      sx={{ borderRadius: '8px' }}
      component={Link}
      href={`${REVIEW_PATH}/${review.id}`}
      underline="none"
    >
      <CardHeader
        avatar={<Avatar aria-label="photo" />}
        // action={
        // <div css={{ display: 'flex', flexDirection: 'column' }}>
        // <IconButton
        //   aria-label="settings"
        //   sx={{ padding: 0, svg: { fontSize: '2.4rem' } }}
        // >
        //   {customIcons[review.coffee.rating].icon}
        //   <Typography
        //     variant="overline"
        //     sx={{ position: 'absolute', bottom: '-1.5rem' }}
        //   >
        //     {customIcons[review.coffee.rating].label}
        //   </Typography>
        // </IconButton>
        // </div>
        // }
        title={
          <Typography variant="subtitle1" fontWeight={500}>
            {review.displayName}
          </Typography>
        }
        // subheader={
        //   <Typography variant="body2" fontSize={12}>
        //     {review.createdAt.toLocaleString().slice(5)}
        //   </Typography>
        // }
      />

      <div css={{ display: 'flex' }}>
        <CardContent
          sx={{ paddingY: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          <Typography fontWeight={500} noWrap>
            {review.place?.place_name}
          </Typography>
          <Typography fontWeight={600} noWrap /* gutterBottom */>
            {/* be{bull}nev{bull}o{bull}lent */}
            <CoffeeIcon
              fontSize="small"
              sx={{ verticalAlign: 'text-bottom', marginRight: '0.25rem' }}
            />
            {review.menuName}
          </Typography>

          <Typography variant="body1" noWrap>
            맛 : {review.coffee?.flavors?.map((t) => `#${t} `)}
          </Typography>
          <Typography variant="body1" noWrap>
            편의 : {review.keywords?.map((t) => `#${t} `)}
          </Typography>
          <Typography variant="body1" noWrap>
            한줄평 : {review.text}
          </Typography>
          <Typography variant="body2" fontSize={12} sx={{ marginY: '0.75rem' }}>
            {new Date(review.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        {review.images.length && (
          <CardMedia
            component="img"
            sx={{
              width: 100,
              height: 100,
              marginRight: '1rem',
              borderRadius: '4px',
            }}
            image={review.images[0].url}
            alt="thumbnail"
          />
        )}
      </div>
      {/* <CardActions>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
        <FavoriteBorderIcon />
      </IconButton>
    </CardActions> */}
    </Card>
  );
}
export default Review;