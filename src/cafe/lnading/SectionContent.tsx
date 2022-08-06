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
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <span style={{ flex: 1 }}></span>

      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        sx={{
          marginX: '1rem',
          marginTop: '5rem',
          marginBottom: '3rem',
          // backgroundColor: 'rgba(2, 32, 71, 0.05)',
          backgroundColor: '#4f9cff',
          color: 'white',
          padding: '2.5rem 1rem',
          borderRadius: '24px',
        }}
      >
        드링크뎁스 메뉴판
      </Typography>

      <Box display="flex" justifyContent={'center'}>
        <img
          src="/images/o2o/모바일 메뉴판.png  "
          alt="landing-2"
          width={'100%'}
          // width={800}
          // height={1198.75}
        />
      </Box>

      <Typography align="center" fontWeight="bold">
        음료 특화 메뉴판
      </Typography>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          marginTop: '1rem',
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

      <span style={{ flex: 1 }}></span>
    </Box>
  );
}
export default SectionContent;
