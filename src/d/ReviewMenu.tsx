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

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AddCommentIcon from '@mui/icons-material/AddComment';
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
  comment: `처음 마셧을때 커피 보다 티?를 마시는 느낌이었습니다.
    약간 아카시아 꿀 같은 느낌 부담없이 꿀꺽마실 수있고 뒷맛에 설탕넣은 듯 단맛이 너무 좋습니다 식었을때 부터 나오는 베르가못향과 베리류 산미도 좋게 마셨습니다`,
};

function ReviewMenu() {
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
          image="/maskable_icon_x512.png"
          alt="thumbnail"
        />
        <CardHeader
          // avatar={<Avatar aria-label="photo">R</Avatar>}
          action={
            // <div css={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton
              aria-label="settings"
              sx={{ padding: 0, svg: { fontSize: '2.4rem' } }}
            >
              {/* <FavoriteBorderIcon /> */}
              {customIcons[data.coffee.rating].icon}
              {/* <SentimentVerySatisfiedIcon fontSize="large" /> */}
              <Typography
                variant="overline"
                sx={{ position: 'absolute', bottom: '-1.5rem' }}
              >
                {customIcons[data.coffee.rating].label}
              </Typography>
            </IconButton>
            // </div>
          }
          title={<Typography variant="h6">{data.menuName}</Typography>}
          subheader={data.cafeName}
        />

        <div css={{ display: 'flex' }}>
          <CardContent sx={{ paddingY: 0 }}>
            <Typography variant="body1" gutterBottom>
              산미 - 높음
            </Typography>
            <Typography variant="body1" gutterBottom>
              단맛 - 보통
            </Typography>
            <Typography variant="body1" gutterBottom>
              맛과향 - 꿀, 딸기, 아몬드
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: '1rem',
              }}
            >
              {data.comment}
            </Typography>
          </CardContent>
        </div>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ThumbUpOutlinedIcon />}
          >
            도움이됨
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<MapsUgcOutlinedIcon />}
          >
            댓글쓰기
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
export default ReviewMenu;
