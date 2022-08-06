import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import Image from 'next/image';

function SectionServey() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span style={{ flex: 1 }}></span>

      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        sx={{
          marginX: '1rem',
          marginTop: '5rem',
          marginBottom: '3rem',
          backgroundColor: 'rgba(2, 32, 71, 0.05)',
          // backgroundColor: '#4f9cff',
          // color: 'white',
          padding: '2.5rem 1rem',
          borderRadius: '24px',
        }}
      >
        설문 조사 결과
      </Typography>

      <Box display="flex" justifyContent={'center'}>
        <Image
          src="/images/o2o/good_menu.png"
          alt="landing-2"
          width={1041}
          height={672}
        />
      </Box>

      <Typography align="center" fontWeight="bold">
        사전 경험적 요소가 포함된
        <div>친절한 메뉴판(B) 선택</div>
        <div></div>
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
              <ThumbUpIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="장점"
            secondary={
              <Typography variant="h6" color="GrayText">
                {'"마셔보지 않아도 어떤 느낌인지 연상이 되서 마셔보고 싶다."'}
              </Typography>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: 'error.main' }}>
              <ThumbDownIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="단점"
            secondary={
              <Typography variant="h6" color="GrayText">
                {'"정보전달은 디테일해서 좋으나 복잡하다."'}
              </Typography>
            }
          />
        </ListItem>
      </List>

      <span style={{ flex: 1 }}></span>
    </Box>
  );
}
export default SectionServey;
