import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, ListItemButton } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NextLinkComposed } from 'src/common/Link';
import { THEME_SEPERATOR } from 'src/theme';
import {
  PROFILE_BADGE_PATH,
  PROFILE_BOOKMARK_PATH,
  PROFILE_MYREVIEW_PATH,
} from 'src/utils/routes';

export default function AlignItemsList() {
  return (
    <div css={{ padding: '1rem' }}>
      <div
        css={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}
      >
        <Avatar
          src="/favicon2.ico"
          sx={{ width: 56, height: 56, marginRight: '1rem' }}
        />
        <Typography fontWeight={600}>커피유공자</Typography>
      </div>
      <Button variant="contained" color="inherit" fullWidth>
        프로필 수정
      </Button>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          '> .MuiListItemButton-root': {
            borderBottom: `1px solid ${THEME_SEPERATOR}`,
          },
        }}
      >
        {pageList.map((page) => (
          <ListItemButton
            // component={NextLinkComposed}
            // to={TAG_PATH}
            key={page.text}
          >
            <ListItemText primary={page.text} />
            <NavigateNextIcon />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

const pageList = [
  {
    text: '찜한 리뷰',
    path: PROFILE_BOOKMARK_PATH,
  },
  {
    text: '작성한 리뷰',
    path: PROFILE_MYREVIEW_PATH,
  },
  {
    text: '업적 보기',
    path: PROFILE_BADGE_PATH,
  },
];
