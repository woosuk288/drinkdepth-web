import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Checkbox, Typography } from '@mui/material';

type CoffeeFilterDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checked: string[];
  handleCheckbox: (value: string) => () => void;
};

export default function CoffeeFilterDrawer({
  open,
  setOpen,
  checked,
  handleCheckbox,
}: CoffeeFilterDrawerProps) {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
          paddingBottom: '0.25rem',
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          필터
        </Typography>
        <Button color="inherit">모두 삭제</Button>
      </Box>
      <Divider />
      <List>
        <Typography variant="h6" fontWeight={600} padding="0.5rem 1rem 0.25rem">
          향미
        </Typography>
        {/* 종류 */}
        {/* 로스팅 */}
        {['바디감', '단맛', '신맛', '쓴맛'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleCheckbox(text)}
            sx={{ height: '2rem' }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(text) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': `checkbox-list-label-${index}`,
                }}
              />
            </ListItemIcon>
            <ListItemText secondary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Typography variant="h6" fontWeight={600} padding="0.5rem 1rem 0.25rem">
          종류
        </Typography>
        {['블렌드', '싱글 오리진', '카페인', '디카페인'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleCheckbox(text)}
            sx={{ height: '2rem' }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(text) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': `checkbox-list-label-${index}`,
                }}
              />
            </ListItemIcon>
            <ListItemText secondary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Typography variant="h6" fontWeight={600} padding="0.5rem 1rem 0.25rem">
          로스팅
        </Typography>
        {['라이트', '라이트 미디엄', '미디엄', '미디엄 다크', '다크'].map(
          (text, index) => (
            <ListItem
              button
              key={text}
              onClick={handleCheckbox(text)}
              sx={{ height: '2rem' }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(text) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': `checkbox-list-label-${index}`,
                  }}
                />
              </ListItemIcon>
              <ListItemText secondary={text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}

const Subtitle = () => {};
