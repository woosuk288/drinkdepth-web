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
import { allBadges, LetterDIcon } from './BadgeList';
import OpacityIcon from '@mui/icons-material/Opacity';

import { customIcons } from './RadioGroupRating';
import Link, { NextLinkComposed } from 'src/common/Link';
import { D_REVIEW_PATH } from 'src/utils/routes';

type Props = {
  review: DReviewType;
  uid?: string;
};
function Review({ review, uid }: Props) {
  const badges = allBadges.filter((badge) =>
    review.profile.badgeIds.includes(badge.id)
  );

  return (
    <Card
      /* variant="outlined" */
      sx={{ borderRadius: '8px' }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label={review.profile.displayName}
            src={review.profile.photoURL}
          />
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
              {review.profile.displayName}
            </Typography>

            {review.profile.badgeIds.length > 0 && (
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
                {badges.map((badge) => (
                  <Tooltip
                    key={badge.id}
                    arrow
                    enterTouchDelay={10}
                    leaveTouchDelay={30000}
                    title={`[${badge.name}] - ${badge.description}`}
                  >
                    <Avatar
                      sx={{
                        border: `1px solid ${badge.color} !important`,
                        '> svg': { color: badge.color },
                      }}
                    >
                      {badge.image}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            )}
          </div>
        }
      />

      <Link
        sx={{ display: 'flex' }}
        href={`${D_REVIEW_PATH}/${review.id}`}
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
              width: '100px',
              minWidth: '100px',
              height: '100px',
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
        href={`${D_REVIEW_PATH}/${review.id}`}
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
