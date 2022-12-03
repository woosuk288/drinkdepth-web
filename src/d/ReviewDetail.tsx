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

const data = {
  uid: '123',
  displayName: '커피유공자',
  createdAt: new Date(),
  cafeName: '바바카멜',
  menuName: '에티오피아 하로 게샤',
  coffee: {
    rating: 5,
  },
  text: `처음 마셧을때 커피 보다 티?를 마시는 느낌이었습니다.
    약간 아카시아 꿀 같은 느낌 부담없이 꿀꺽마실 수있고 뒷맛에 설탕넣은 듯 단맛이 너무 좋습니다 식었을때 부터 나오는 베르가못향과 베리류 산미도 좋게 마셨습니다`,
};

type Props = {
  review: CafeMenuReviewType;
};

function ReviewDetail({ review }: Props) {
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
          <Typography variant="body1" gutterBottom>
            원두명 - {review.coffee?.bean}
          </Typography>
          <Typography variant="body1" gutterBottom>
            원산지 - {review.coffee?.country}
          </Typography>
          <Typography variant="body1" gutterBottom>
            산미 - {review.coffee?.acidity}
          </Typography>
          <Typography variant="body1" gutterBottom>
            단맛 - {review.coffee?.sweetness}
          </Typography>
          <Typography variant="body1" gutterBottom>
            향미노트 - {review.coffee?.flavors?.map((f) => `#${f} `)}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              marginTop: '1rem',
            }}
          >
            {review.text}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            {review.createdAt.toLocaleString()}
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
        </CardActions>
      </Card>
    </div>
  );
}
export default ReviewDetail;
