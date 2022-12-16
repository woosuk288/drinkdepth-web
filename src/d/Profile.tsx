import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, ListItemButton } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link, { NextLinkComposed } from 'src/common/Link';
import { THEME_SEPERATOR } from 'src/theme';
import {
  BADGE_PATH,
  // PROFILE_BADGE_PATH,
  BOOKMARK_PATH,
  PROFILE_EDIT_PATH,
  MYREVIEW_PATH,
} from 'src/utils/routes';
import { useRouter } from 'next/router';

type Props = {
  profile: ProfileType;
};
export default function Profile({ profile }: Props) {
  const router = useRouter();

  return (
    <div css={{ padding: '1rem' }}>
      <div
        css={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}
      >
        <Avatar
          src={profile.photoURL}
          sx={{ width: 56, height: 56, marginRight: '1rem' }}
        />
        <Typography fontWeight={600}>{profile.displayName}</Typography>
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
          <ListItemButton
            component={NextLinkComposed}
            to={{
              pathname: router.asPath + page.path,
              query: { uid: profile.provider.toLowerCase() + ':' + profile.id },
            }}
            linkAs={router.asPath + page.path}
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
    path: BOOKMARK_PATH,
  },
  {
    text: '작성한 리뷰',
    path: MYREVIEW_PATH,
  },
  {
    text: '업적 보기',
    path: BADGE_PATH,
  },
];
