import styled from '@emotion/styled';
import {
  Box,
  Button,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import LazyImage from '../common/LazyImage';
import { getLabelWithColor, getTestType } from '../utils/combos';
import { MenuDetailProps } from '../utils/types';

import MoodIcon from '@mui/icons-material/Mood';

function MenuDetail({ item }: MenuDetailProps) {
  const [isSmartMenu, setIsSmartMenu] = useState(false);

  useLayoutEffect(() => {
    const isSmart = getTestType() === 'smart';
    setIsSmartMenu(isSmart);
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '75%',
          },
          ' .img': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <img className="img" src={item.imageURL} alt={item.description} />
      </Box>

      <Box sx={{ padding: '2rem' }}>
        <Typography
          sx={{
            marginBottom: '1rem',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {isSmartMenu && item.description}
        </Typography>

        <Typography
          sx={{
            marginBottom: '1rem',

            display: 'block',
            '> span ': {
              marginRight: '2px',
              color: '#fff',
              padding: '2px',
              borderRadius: '2px',
            },
          }}
          component="span"
          fontWeight="bold"
          gutterBottom
        >
          {isSmartMenu &&
            item.labels.map((label) => (
              <span
                key={label}
                style={{
                  backgroundColor: getLabelWithColor(label).color,
                }}
              >
                {label}
              </span>
            ))}
        </Typography>

        <Typography sx={{ color: 'red' }}>
          {item.price.toLocaleString()}
        </Typography>
      </Box>

      <Box
        margin="1.5rem auto"
        maxWidth={(theme) => theme.breakpoints.values.md}
        padding="1rem"
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          align="center"
          sx={{ marginTop: '2rem', marginBottom: '-1rem' }}
        >
          추천 궁합
        </Typography>
        <RoasteryImagesWrapper>
          {pairingMenus.map((pairingMenu, key) => (
            <ImageListItem key={key}>
              <LazyImage src={pairingMenu.imageURL} />
              <ImageListItemBar title={pairingMenu.name} />
            </ImageListItem>
          ))}
        </RoasteryImagesWrapper>
      </Box>

      <List>
        <Typography
          variant="h6"
          fontWeight="bold"
          align="center"
          sx={{ marginBottom: '2rem' }}
        >
          고객 리뷰
        </Typography>

        {/* Comments */}
        {comments?.slice(0, 3).map((comment) => (
          <ListItem key={comment.id}>
            <Typography
              fontWeight="bold"
              component="span"
              sx={{ marginRight: '1rem' }}
            >
              {comment.username}
            </Typography>
            {comment.comment}
          </ListItem>
        ))}
        {comments?.length > 3 && (
          <ListItem>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ cursor: 'pointer' }}
            >
              댓글 {comments?.length}개 모두 보기
            </Typography>
          </ListItem>
        )}

        {/* TextField */}
        <TextField
          sx={{ paddingLeft: '1rem', paddingY: '0.5rem' }}
          placeholder="댓글 달기..."
          fullWidth
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoodIcon fontSize="large" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={{ fontWeight: 'bold' }}>게시</Button>
              </InputAdornment>
            ),

            disableUnderline: true,
          }}
        />
      </List>

      {/* <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={{
            width: '50%',
            height: 64,
            margin: '1rem',
            fontSize: 20,
            fontWeight: 500,
            borderRadius: 16,
          }}
          onClick={() => {}}
        >
          쿠폰 발행
        </Button>
      </Box> */}
    </div>
  );
}
export default MenuDetail;

const RoasteryImagesWrapper = styled.div`
  position: relative;
  margin: 48px 0;
  display: grid;
  grid-auto-columns: 200px; /* 반드시! */
  grid-auto-flow: column; /* row 를 가지지않을거라면 반드시! */
  grid-template-rows: 200px;
  grid-gap: 20px;
  justify-content: center;

  & > img {
    border-radius: 0.5rem;
  }

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(168px, 300px));
    grid-auto-flow: unset;
    grid-template-rows: repeat(2, minmax(168px, 1fr));
    grid-gap: 8px;
  }
`;

const pairingMenus = [
  {
    name: '크루아상 센드위치',
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220527_195%2F1653632505388lV5Al_JPEG%2F04009EE0-4DE0-4C4A-8A60-F0EF4A52C349.jpeg',
  },
  {
    name: '레몬 타코타치즈 케이크',
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220527_112%2F16536328265160BwhU_JPEG%2FB19778C9-B311-47E8-A416-4EEB256205BB.jpeg',
  },
  {
    name: '플레인 크로플',
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220527_279%2F1653632749019LpKCl_JPEG%2F9F56D59B-3927-483E-9530-0137C2AB5198.jpeg',
  },
  {
    name: '브라운치즈 크로플',
    imageURL:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220527_145%2F1653632772543vNQWz_JPEG%2F6D5A8DB3-3D18-4AE1-A051-F2F61966B8FC.jpeg',
  },
];

const comments = [
  {
    id: '1',
    username: 'lee***',
    comment: '자스민향이 정말 잘 어울린 맛이 나요~',
  },
  {
    id: '2',
    username: 'yan***',
    comment: '오렌지향이좀 나는 것 같은데...',
  },
  {
    id: '3',
    username: 'dri***',
    comment: '이런 커피 처음 먹어봐요. 대박!',
  },
  {
    id: '4',
    username: 'dep***',
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ratione sunt cupiditate adipisci, qui eaque corrupti consequuntur debitis maxime explicabo minima dolorum nemo, rerum delectus! Reprehenderit voluptatem ex sequi quam.',
  },
];
