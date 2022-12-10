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

import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

import { customIcons } from './RadioGroupRating';
import Link, { NextLinkComposed } from 'src/common/Link';
import { REVIEW_EDIT_PATH } from 'src/utils/routes';
// import Link from 'next/link';

type Props = {
  review: CafeMenuReviewType;
  userId?: string;
};

function ReviewDetail({ review, userId }: Props) {
  // console.log('review : ', review);
  return (
    <div>
      {/* <Card
        sx={{
          borderRadius: '8px',
          marginBottom: '0.25rem',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // width: '100%',
            height: '56.25vw',
            // maxHeight: '70%',
            // marginRight: '1rem',
            borderRadius: '4px',
          }}
          image="/maskable_icon_x512.png"
          alt="thumbnail"
        />
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              sx={{ padding: 0, svg: { fontSize: '2.4rem' } }}
            >
              {customIcons[data.coffee.rating].icon}
              <Typography
                variant="overline"
                sx={{ position: 'absolute', bottom: '-1.5rem' }}
              >
                {customIcons[data.coffee.rating].label}
              </Typography>
            </IconButton>
          }
          title={<Typography variant="h6">{data.menuName}</Typography>}
          subheader={data.cafeName}
        />

        <div css={{ display: 'flex' }}>
          <CardContent sx={{ paddingY: 0 }}>
            <Typography
              variant="body1"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'pre-line',
              }}
            >
              수제자몽청과 핸드드립커피가 토닉과 함께 어울어진 어디서도 맛보지
              못한 음료같은 커피
            </Typography>
          </CardContent>
        </div>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FavoriteBorderIcon />}
          >
            먹고싶다
          </Button>
          <Button variant="outlined" color="inherit" startIcon={<EditIcon />}>
            리뷰쓰기
          </Button>
        </CardActions>
      </Card> */}

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
            height: '56.25vw',
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

        <CardContent sx={{ paddingY: 0 }}>
          {review.coffee?.bean && (
            <Typography variant="body1" gutterBottom>
              원두명 - {review.coffee?.bean}
            </Typography>
          )}
          {review.coffee?.country && (
            <Typography variant="body1" gutterBottom>
              원산지 - {review.coffee?.country}
            </Typography>
          )}
          <div css={{ display: 'flex' }}>
            {review.coffee?.acidity && (
              <Typography
                variant="body1"
                gutterBottom
                component="span"
                sx={{ marginRight: '1rem' }}
              >
                산미 - {review.coffee?.acidity}
              </Typography>
            )}

            {review.coffee?.sweetness && (
              <Typography variant="body1" gutterBottom component="span">
                단맛 - {review.coffee?.sweetness}
              </Typography>
            )}
          </div>
          <Typography variant="body1" gutterBottom>
            향미노트 - {review.coffee?.flavors?.map((f) => `#${f} `)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            편의적 측면 - {review.keywords?.map((f) => `#${f} `)}
          </Typography>
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

          <Typography variant="overline" color="text.secondary">
            {new Date(review.createdAt).toLocaleString()}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ThumbUpOutlinedIcon />}
          >
            0
          </Button>
          {/* <Button
            variant="outlined"
            color="inherit"
            startIcon={<MapsUgcOutlinedIcon />}
          >
            댓글쓰기
          </Button> */}

          <div css={{ flex: 1 }}></div>

          {review.uid === userId && (
            <div css={{ '> button': { marginLeft: '0.25rem' } }}>
              <Button
                variant="outlined"
                color="inherit"
                component={NextLinkComposed}
                to={{
                  pathname: REVIEW_EDIT_PATH,

                  query: { id: review.id, review: JSON.stringify(review) },

                  // as: {REVIEW_EDIT_PATH}
                }}
                linkAs={`${REVIEW_EDIT_PATH}/${review.id}`}
              >
                수정
              </Button>
              <Button variant="outlined" color="inherit">
                삭제
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
export default ReviewDetail;
