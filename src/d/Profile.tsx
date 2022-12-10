import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, ListItemButton } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'src/common/Link';
import { THEME_SEPERATOR } from 'src/theme';
import {
  PROFILE_BADGE_PATH,
  PROFILE_BOOKMARK_PATH,
  PROFILE_EDIT_PATH,
  PROFILE_MYREVIEW_PATH,
} from 'src/utils/routes';

type Props = {
  me: ProfileType;
};
export default function Profile({ me }: Props) {
  return (
    <div css={{ padding: '1rem' }}>
      <div
        css={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}
      >
        <Avatar
          src={me.photoURL}
          sx={{ width: 56, height: 56, marginRight: '1rem' }}
        />
        <Typography fontWeight={600}>{me.displayName}</Typography>
      </div>
      <Button
        variant="contained"
        color="inherit"
        fullWidth
        component={Link}
        href={PROFILE_EDIT_PATH}
      >
        프로필 수정
      </Button>

      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          '> .MuiListItemButton-root': {
            borderBottom: `1px solid ${THEME_SEPERATOR}`,
          },
        }}
      >
        {pageList.map((page) => (
          <ListItemButton component={Link} href={page.path} key={page.text}>
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
