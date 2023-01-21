import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Badge, Button, ListItemButton } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link, { NextLinkComposed } from 'src/common/Link';
import { THEME_SEPERATOR } from 'src/theme';
import {
  MYBADGE_PATH,
  // PROFILE_BADGE_PATH,
  D_PROFILE_EDIT_PATH,
  MYREVIEW_PATH,
  THUMBREVIEW_PATH,
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
        href={D_PROFILE_EDIT_PATH}
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
            key={page.id}
            component={NextLinkComposed}
            to={router.asPath + page.path}
          >
            {page.path === MYBADGE_PATH && profile.hasNewBadge ? (
              <div css={{ flex: 1 }}>
                <Badge color="secondary" badgeContent="N">
                  <ListItemText primary={page.text} />
                </Badge>
              </div>
            ) : (
              <ListItemText primary={page.text} />
            )}

            <NavigateNextIcon />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

const pageList = [
  {
    id: 'bookmark',
    text: '찜한 리뷰',
    path: THUMBREVIEW_PATH,
  },
  {
    id: 'review',
    text: '작성한 리뷰',
    path: MYREVIEW_PATH,
  },
  {
    id: 'badge',
    text: '업적 보기',
    path: MYBADGE_PATH,
  },
];
