import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import TagIcon from '@mui/icons-material/Tag';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import SearchIcon from '@mui/icons-material/Search';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import Image from 'next/image';

function SectionContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5rem' }}>
      <span style={{ flex: 1 }}></span>

      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{
          marginTop: '5rem',
        }}
      >
        {`'친절한 메뉴판'`}의 단점은
        <br />
        모바일 전문 메뉴판으로 <br />
        해결 가능합니다.
      </Typography>

      <Box sx={{ width: '30%', marginX: 'auto' }}>
        <Image
          src="/images/o2o/landing_check.png"
          alt="two_drink"
          width={800}
          height={800}
        />
      </Box>

      <List
        sx={{
          bgcolor: 'background.paper',
          '.MuiListItemText-primary': {
            fontSize: '1.5rem',
            fontWeight: 600,
          },
          '.MuiListItemText-secondary': {
            fontSize: '1rem',
          },
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: 'primary.main' }}>
              <TagIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="음료 중심의 데이터 설계"
            secondary={
              <Typography
                variant="h6"
                color="GrayText"
                sx={{ marginTop: '0.25rem', lineHeight: 1.4 }}
              >
                {'유저에게 음료 선택의 가이드라인을 제공합니다.'}
              </Typography>
            }
          />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar /*  sx={{ backgroundColor: '#6AD7FF' }} */>
              <SearchIcon />
            </Avatar>
          </ListItemAvatar>
          {/* <ListItemButton>
                <ListItemIcon>
                  <MoneyOffIcon color="primary" fontSize="large" />
                </ListItemIcon>
              </ListItemButton> */}
          <ListItemText
            primary="음료의 지도 검색 기능"
            secondary={
              <Typography
                variant="h6"
                color="GrayText"
                sx={{ marginTop: '0.25rem', lineHeight: 1.4 }}
              >
                {'목적지에 내가 주로 마시는 음료를 검색 및 필터링 합니다.'}
              </Typography>
            }
          />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: 'secondary.main' }}>
              <EmojiPeopleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="유저 친화적 UI/UX"
            secondary={
              <Typography
                variant="h6"
                color="GrayText"
                sx={{ marginTop: '0.25rem', lineHeight: 1.4 }}
              >
                {'내 위치 기반, 메뉴 찜 등의 유저 친화적인 인터페이스.'}
              </Typography>
            }
          />
        </ListItem>
      </List>

      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <img
          src="/images/o2o/landing_cafe_intro.png"
          alt="landing-2"
          width={'100%'}
          // width={800}
          // height={1198.75}
        />
      </Box>

      <Typography
        align="center"
        fontWeight="bold"
        sx={{
          padding: '1rem',
          backgroundColor: '#4f9cff',
          color: 'white',
          borderRadius: '16px',
          marginY: '1rem',
        }}
      >
        드링크뎁스 메뉴판
      </Typography>

      <Box display="flex" justifyContent={'center'}>
        <img
          src="/images/o2o/모바일 메뉴판.png"
          alt="landing-2"
          width={'100%'}
          // width={800}
          // height={1198.75}
        />
      </Box>

      <span style={{ flex: 1 }}></span>
    </Box>
  );
}
export default SectionContent;
