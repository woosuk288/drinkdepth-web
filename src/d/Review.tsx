import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import PlaceIcon from '@mui/icons-material/Place';

import { allBadges } from './BadgeList';

import { customIcons } from './RadioGroupRating';
import Link from 'src/common/Link';
import { D_CAFE_PATH, D_REVIEW_PATH } from 'src/utils/routes';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import LazyImage from 'src/common/LazyImage';

type Props = {
  review: DReviewType;
  uid?: string;
  index: number;
};
function Review({ review, uid, index }: Props) {
  const router = useRouter();

  const badges = allBadges.filter((badge) =>
    review.profile.badgeIds.includes(badge.id)
  );

  const handleLocationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const placeId = review.place?.id;
    const pathname = D_CAFE_PATH + `/${placeId}`;

    router.push(
      { pathname, query: { place: JSON.stringify(review.place) } },
      pathname
    );
  };

  return (
    <Card
      /* variant="outlined" */
      sx={{ borderRadius: '8px' }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }}
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
            <Typography
              variant="subtitle1"
              fontWeight={600}
              marginRight="0.25rem"
            >
              {review.profile.displayName}
            </Typography>

            {review.profile.badgeIds.length > 0 && (
              <AvatarGroup>
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
                        width: '1rem',
                        height: '1rem',
                        bgcolor: 'transparent',
                        border: `1px solid ${badge.color} !important`,
                        '> svg': { color: badge.color, fontSize: '0.825rem' },
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
        subheader={
          <Typography variant="body2" fontSize={12}>
            {dayjs(review.createdAt).format('YY.M.D.dd')}
          </Typography>
        }
      />
      <Link
        href={`${D_REVIEW_PATH}/${review.id}`}
        underline="none"
        color="inherit"
      >
        <CardContent sx={{ paddingTop: 0 }}>
          <Typography fontWeight={600} noWrap>
            {review.menuName}
          </Typography>
          <div css={{ marginLeft: '-0.25rem' }}>
            {(review.coffee?.flavors?.length ?? 0) > 0 &&
              review.coffee?.flavors?.map((flavor) => (
                <Chip
                  key={flavor}
                  label={flavor}
                  variant="filled"
                  size="small"
                />
              ))}
          </div>
        </CardContent>

        {(review.images?.length ?? 0) > 0 ? (
          <CardMedia
            // component="img"
            sx={{
              // height: '200px',

              // height: { xs: '56.25vw', sm: '337.5px' },
              height: { xs: '75vw', sm: '337.5px' },
              borderRadius: '4px',
            }}
            // image={review.images[0].url}
          >
            <LazyImage
              src={review.images[0].url}
              alt="thumbnail"
              options={{ rootMargin: '400px' }}
              isImgLoaded={index < 3}
            />
          </CardMedia>
        ) : null}

        <CardContent
          sx={{
            ':last-child': { paddingBottom: '0' },

            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
        >
          <div css={{ marginLeft: '-0.25rem', marginBottom: '0.5rem' }}>
            {(review.keywords?.length ?? 0) > 0 &&
              review.keywords?.map((keyword) => (
                <Chip
                  key={keyword}
                  label={keyword}
                  variant="filled"
                  size="small"
                />
              ))}
          </div>

          <Typography
            variant="body2"
            whiteSpace="pre-line"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {review.text}
          </Typography>
        </CardContent>
      </Link>

      {/* <CardContent sx={{ paddingTop: '0.5rem' }}>
        <Typography variant="body2" fontSize={12}>
          {new Date(review.createdAt).toLocaleString()}
        </Typography>
      </CardContent> */}

      <CardContent>
        <Card>
          <CardHeader
            title={
              <Typography
                fontWeight={600}
                component={'a'}
                href="#"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  ':hover': { textDecoration: 'underline' },
                }}
                onClick={handleLocationClick}
              >
                {review.place?.place_name}
                <span css={{ position: 'relative' }}>
                  <PlaceIcon
                    fontSize="small"
                    sx={{ position: 'absolute', left: 0, top: 0 }}
                  />
                </span>
              </Typography>
            }
            subheader={
              <Typography variant="body2" fontSize={13}>
                {review.place?.address_name}
              </Typography>
            }
          />
        </Card>
      </CardContent>
    </Card>
  );
}
export default Review;
