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
        align="center"
        fontWeight="bold"
        sx={{
          marginTop: '10rem',
          marginBottom: '3rem',
        }}
      >
        만약 친절하면 어떨까요?
      </Typography>

      <Box display="flex" justifyContent={'center'}>
        <Image
          src="/images/o2o/good_menu.png"
          alt="landing-2"
          width={1041}
          height={672}
        />
      </Box>

      <Typography
        variant="h6"
        align="center"
        // fontWeight="bold"
        sx={{ padding: '1rem' }}
      >
        {`실제로 해당 경험이 반영된 메뉴판 테스트 결과 사전 경험이 잘 반영된
        '착한메뉴판' b 메뉴판을 더 선호하는 것으로 알려졌습니다.`}
      </Typography>

      <Typography
        variant="h4"
        align="center"
        // fontWeight="bold"
        gutterBottom
        sx={{
          marginTop: '5rem',
        }}
      >
        하지만 <span style={{ fontWeight: 'bold', color: 'red' }}>단점</span>도
        존재합니다.
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
