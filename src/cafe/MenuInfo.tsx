import styled from '@emotion/styled';
import {
  Box,
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useEffect, useState } from 'react';
import LazyImage from '../common/LazyImage';
import { getLabelWithColor, getTestType } from '../utils/combos';

import MenuReview from './MenuReview';
import { sxSquareImg } from '../styles/GlobalSx';
import { MASKABLE_ICON_PATH, NORMAL } from 'src/utils/constants';
import { COLOR_PRICE } from 'src/theme';

function MenuInfo({
  menu,
  pairingMenus,
}: {
  menu: CafeMenuType;
  pairingMenus?: CafeMenuType[];
}) {
  const [isSmartMenu, setIsSmartMenu] = useState(false);
  const [showMorePair, setShowMorePair] = useState(false);

  useEffect(() => {
    const isSmart = getTestType() !== NORMAL;
    setIsSmartMenu(isSmart);
  }, []);

  // const shuffledMenus = shuffle<CafeMenuType>(pairingMenus?? []);
  const sortedPairingMenus = (pairingMenus ?? [])
    .map((menu) => menu)
    .sort((a, b) => (a.images?.['240x240'] ? -1 : 1));

  const displayPairsLength = showMorePair ? (pairingMenus ?? []).length : 4;

  return (
    <div>
      <Box sx={sxSquareImg}>
        <img
          className="img"
          src={menu.images?.['960x960'] || MASKABLE_ICON_PATH}
          alt={menu.description}
        />
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
          {isSmartMenu && menu.description}
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
            menu.labels.map((label) => (
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

        <Typography fontWeight={'bold'} sx={{ color: COLOR_PRICE }}>
          {menu.price.toLocaleString()}원
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          align="center"
          sx={{ marginTop: '2rem' }}
        >
          {menu.cafeId + "'s TIP"}
        </Typography>
        <Typography align="center" sx={{ marginTop: '1rem', paddingX: '1rem' }}>
          {menu.ownerComment}
        </Typography>
        {/* <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={menu.cafeId.toUpperCase()}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              sx={
                {
                  // '& > .MuiListItemText-primary': { fontSize: '18px' },
                  // '& > .MuiListItemText-secondary': { fontSize: '16px' },
                }
              }
              // primary={menu.cafeId}
              // secondary="상쾌함이 있는 커피와 조합된 시그니처 음료 입니다."
              primary="상쾌함이 있는 커피와 조합된 시그니처 음료 입니다."
            />
          </ListItem>
        </List> */}
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
          {sortedPairingMenus
            ?.slice(0, displayPairsLength)
            .map((pairingMenu, key) => (
              <ImageListItem key={key}>
                <LazyImage
                  src={
                    pairingMenu.images?.['240x240'] ||
                    '/images/logo_name_vertical.png'
                  }
                />
                <ImageListItemBar title={pairingMenu.name} />
              </ImageListItem>
            ))}
        </RoasteryImagesWrapper>
        {sortedPairingMenus.length > 4 && (
          <div
            style={{
              marginTop: '-32px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {showMorePair ? (
              <IconButton onClick={() => setShowMorePair(() => !showMorePair)}>
                <ExpandLessIcon />
              </IconButton>
            ) : (
              <Button
                color="inherit"
                onClick={() => setShowMorePair(() => !showMorePair)}
              >
                메뉴 더 보기
              </Button>
            )}
          </div>
        )}
      </Box>

      <MenuReview
        cafeId={menu.cafeId}
        menuId={menu.id}
        reviewCount={menu.reviewCount}
      />

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
export default MenuInfo;

const RoasteryImagesWrapper = styled.div`
  position: relative;
  margin: 48px 0;
  display: grid;
  grid-auto-columns: 200px; /* 반드시! */
  grid-auto-flow: column; /* row 를 가지지않을거라면 반드시! */
  grid-template-rows: 200px;
  grid-gap: 20px;
  justify-content: center;

  & img {
    border-radius: 0.5rem;
    height: 200px;
  }

  @media (max-width: 900px) {
    display: grid;
    /* grid-template-columns: repeat(2, minmax(168px, 300px)); */
    grid-template-columns: repeat(2, minmax(168px, 168px));
    grid-auto-flow: unset;
    /* grid-template-rows: repeat(2, minmax(168px, 1fr)); */
    grid-template-rows: repeat(2, minmax(168px, 168px));
    grid-gap: 8px;

    & img {
      height: 160px;
    }
  }
`;

// 출처: https://7942yongdae.tistory.com/96 [프로그래머 YD:티스토리]
// function shuffle<T>(array: T[]) {
//   const resultArray = array.map(item => item);
//   for (let index = resultArray.length - 1; index > 0; index--) {
//     // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
//     const randomPosition = Math.floor(Math.random() * (index + 1));

//     // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
//     const temporary = resultArray[index];
//     resultArray[index] = resultArray[randomPosition];
//     resultArray[randomPosition] = temporary;
//   }
//   return resultArray;
// }
