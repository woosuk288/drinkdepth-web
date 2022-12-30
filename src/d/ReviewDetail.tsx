import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

import { customIcons } from './RadioGroupRating';
import { NextLinkComposed } from 'src/common/Link';
import { D_REVIEW_EDIT_PATH } from 'src/utils/routes';
import ChoiceTable from 'src/o2o/place/coffeeDetailDialog/ChoiceTable';
import { FILTERED_COFFEE } from 'src/utils/constants';
import { getBeanTypeLabel } from 'src/utils/combos';
// import Link from 'next/link';

type Props = {
  review: DReviewType;
  userId?: string;
  handleReviewDelete: () => void;
  thumbUp: boolean;
  handleThumbUp: () => void;
};

function ReviewDetail({
  review,
  userId,
  handleReviewDelete,
  thumbUp,
  handleThumbUp,
}: Props) {
  // console.log('review : ', review);

  const beanOptions =
    review.type === FILTERED_COFFEE &&
    [
      {
        name: '원두 유형',
        value: getBeanTypeLabel(review.coffee?.beanType),
      },
      {
        name: '원산지',
        value: review.coffee?.country ?? '',
      },
      {
        name: '가공법',
        value: review.coffee?.process ?? '',
      },
    ].filter((o) => !!o.value);

  const flavorOptions =
    review.type === FILTERED_COFFEE &&
    [
      {
        name: '산미',
        value: review.coffee?.acidity ?? '',
      },
      {
        name: '단맛',
        value: review.coffee?.sweetness ?? '',
      },
      {
        name: '로스팅',
        value: review.coffee?.roasting ?? '',
      },
    ].filter((o) => !!o.value);

  const flavors =
    review.type === FILTERED_COFFEE
      ? review.coffee?.flavors
      : review.otherDrink?.flavors;

  return (
    <div>
      <Card
        /* variant="outlined" */
        sx={{
          borderRadius: '8px',
          marginBottom: '0.25rem',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // width: '100%',
            height: { xs: '56.25vw', sm: '337.5px' },
            // maxHeight: '70%',
            // marginRight: '1rem',
            borderRadius: '4px',
          }}
          image={
            review.images.length > 0
              ? review.images[0].url
              : '/maskable_icon_x512.png'
          }
          alt="thumbnail"
        />

        <CardHeader
          // avatar={<Avatar aria-label="photo">R</Avatar>}
          action={
            // <div css={{ display: 'flex', flexDirection: 'column' }}>
            review.rating ? (
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
            ) : null
            // </div>
          }
          title={
            <Typography variant="h6">{review.place?.place_name}</Typography>
          }
          subheader={<Typography>{review.menuName}</Typography>}
        />

        {beanOptions && (
          <CardContent>
            <ChoiceTable choiceOptions={beanOptions} />
          </CardContent>
        )}
        {flavorOptions && (
          <CardContent>
            <ChoiceTable choiceOptions={flavorOptions} />
          </CardContent>
        )}

        <CardContent sx={{ '> div': { border: '1px solid darkgray' } }}>
          {flavors?.map((flavor) => (
            <Chip key={flavor} label={flavor} variant="filled" />
          ))}
        </CardContent>

        <CardContent sx={{ paddingBottom: 0 }}>
          {review.keywords?.map((keyword) => (
            <Chip key={keyword} label={keyword} variant="filled" />
          ))}
        </CardContent>

        <CardContent>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              marginTop: '1rem',
            }}
            whiteSpace="pre-line"
          >
            {review.text}
          </Typography>
        </CardContent>

        {/* <CardContent>

        </CardContent> */}

        <CardActions>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ marginLeft: '0.5rem', marginTop: '-1rem' }}
          >
            {new Date(review.createdAt).toLocaleString()}
          </Typography>

          <div css={{ flex: 1 }}></div>

          {review.profile.uid === userId && (
            <div css={{ '> button': { marginLeft: '0.25rem' } }}>
              <Button
                variant="outlined"
                color="inherit"
                component={NextLinkComposed}
                to={{
                  pathname: D_REVIEW_EDIT_PATH,

                  query: { id: review.id, review: JSON.stringify(review) },

                  // as: {REVIEW_EDIT_PATH}
                }}
                linkAs={`${D_REVIEW_EDIT_PATH}/${review.id}`}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleReviewDelete}
              >
                삭제
              </Button>
            </div>
          )}
        </CardActions>
        <div css={{ margin: '1rem', textAlign: 'center' }}>
          <IconButton size="large" onClick={handleThumbUp}>
            {thumbUp ? (
              <ThumbUpIcon sx={{ fontSize: 48 }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ fontSize: 48 }} />
            )}

            {thumbUp && <span css={{ marginLeft: '0.75rem' }}>1</span>}
          </IconButton>
        </div>
        {/* <Button
          variant="outlined"
          color="inherit"
          startIcon={<MapsUgcOutlinedIcon />}
        >
          댓글쓰기
        </Button> */}
      </Card>
    </div>
  );
}
export default ReviewDetail;
