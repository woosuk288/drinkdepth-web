import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { badges, LetterDIcon } from './BadgeList';
import OpacityIcon from '@mui/icons-material/Opacity';

import { customIcons } from './RadioGroupRating';
import Link, { NextLinkComposed } from 'src/common/Link';
import { REVIEW_PATH } from 'src/utils/routes';

type Props = {
  review: CafeMenuReviewType;
  uid?: string;
};
function Review({ review, uid }: Props) {
  return (
    <Card
      /* variant="outlined" */
      sx={{ borderRadius: '8px' }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label={review.displayName} src={review.photoURL} />
        }
        action={
          <>
            {uid && review.rating ? (
              <div css={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton
                  aria-label="settings"
                  sx={{ padding: 0, svg: { fontSize: '2.4rem' } }}
                >
                  {customIcons[review.rating].icon}
                  <Typography
                    variant="overline"
                    sx={{ position: 'absolute', bottom: '-1.5rem' }}
                  >
                    {customIcons[review.rating].label}
                  </Typography>
                </IconButton>
              </div>
            ) : null}
          </>
        }
        title={
          <div css={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight={500} marginRight="1rem">
              {review.displayName}
            </Typography>

            {review.uid === 'kakao:2341305282' && (
              <AvatarGroup
                sx={{
                  '> div': {
                    width: 32,
                    height: 32,
                    bgcolor: 'transparent',
                  },
                }}
              >
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <Tooltip
                  arrow
                  enterTouchDelay={10}
                  leaveTouchDelay={30000}
                  title={`${badges[0].name} - ${badges[0].description}`}
                >
                  <Avatar
                    sx={{
                      border: `1px solid ${badges[0].color} !important`,
                      '> svg': { color: badges[0].color },
                    }}
                  >
                    {badges[0].image}
                  </Avatar>
                </Tooltip>
                {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}
                <Tooltip
                  arrow
                  enterTouchDelay={10}
                  leaveTouchDelay={30000}
                  title={`${badges[1].name} - ${badges[1].description}`}
                >
                  <Avatar
                    sx={{
                      border: `1px solid ${badges[1].color} !important`,
                      '> svg': { color: badges[1].color },
                    }}
                  >
                    {badges[1].image}
                    {/* <OpacityIcon color="error" /> */}
                  </Avatar>
                </Tooltip>
              </AvatarGroup>
            )}
          </div>
        }
      />

      <Link
        sx={{ display: 'flex' }}
        href={`${REVIEW_PATH}/${review.id}`}
        underline="none"
        color="inherit"
      >
        <CardContent
          sx={{
            paddingY: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
          // component={Link}
        >
          <Typography fontSize={18} fontWeight={600} noWrap>
            {review.place?.place_name}
          </Typography>

          {(review.keywords?.length ?? 0) > 0 && (
            <Typography variant="body1" noWrap>
              {review.keywords?.map((t) => `#${t} `)}
            </Typography>
          )}

          <div css={{ margin: '0.5rem' }}></div>

          <Typography fontWeight={600} noWrap>
            <CoffeeIcon
              fontSize="small"
              sx={{ verticalAlign: 'text-bottom', marginRight: '0.25rem' }}
            />
            {review.menuName}
          </Typography>

          {(review.coffee?.flavors?.length ?? 0) > 0 && (
            <Typography variant="body1" noWrap>
              {review.coffee?.flavors?.map((t) => `#${t} `)}
            </Typography>
          )}
        </CardContent>
        <div css={{ flex: 1 }}></div>
        {review.images.length ? (
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
        ) : null}
      </Link>

      <CardContent
        sx={{ paddingBottom: 0, display: 'block' }}
        component={Link}
        href={`${REVIEW_PATH}/${review.id}`}
        underline="none"
        color="inherit"
      >
        <Typography variant="body1" noWrap>
          {review.text}
        </Typography>
      </CardContent>

      <CardContent sx={{ ':last-child': { paddingBottom: '1rem' } }}>
        <Typography variant="body2" fontSize={12}>
          {new Date(review.createdAt).toLocaleString()}
        </Typography>
      </CardContent>

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
