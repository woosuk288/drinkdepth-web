import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Checkbox, Typography } from '@mui/material';
import { CoffeeOption } from '../../pages/coffee';

type CoffeeFilterDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  checked: CoffeeOption;
  handleCheckbox: (key: keyof CoffeeOption, value: string) => () => void;
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
        <Typography variant="h6" fontWeight={700}>
          필터
        </Typography>
        <Button color="inherit">모두 삭제</Button>
      </Box>
      <Divider />
      <List>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          padding="0.5rem 1rem 0.25rem"
        >
          향미
        </Typography>
        {/* 종류 */}
        {/* 로스팅 */}
        {coffeeAllFilterOptions.flavors.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleCheckbox('flavors', text)}
            sx={{ height: '2rem' }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.flavors.indexOf(text) !== -1}
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
        <Typography
          variant="subtitle1"
          fontWeight={600}
          padding="0.5rem 1rem 0.25rem"
        >
          종류
        </Typography>
        {coffeeAllFilterOptions.type.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleCheckbox('type', text)}
            sx={{ height: '2rem' }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.type.indexOf(text) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': `checkbox-list-label-${index}`,
                }}
              />
            </ListItemIcon>
            <ListItemText secondary={getTypeName(text)} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          padding="0.5rem 1rem 0.25rem"
        >
          로스팅
        </Typography>
        {coffeeAllFilterOptions.roasting.map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleCheckbox('roasting', text)}
            sx={{ height: '2rem' }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.roasting.indexOf(text) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': `checkbox-list-label-${index}`,
                }}
              />
            </ListItemIcon>
            <ListItemText secondary={getRoastingName(text)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}

const coffeeAllFilterOptions = {
  flavors: ['달콤', '고소', '쌉살', '부드러운', '묵직한', '밸런스'],
  roasting: ['light', 'light_medium', 'medium', 'medium_dark', 'dark'] as const,
  type: ['blend', 'single_origin', 'decaffeination'] as const,
};

const ROASTING = {
  light: '라이트',
  light_medium: '라이트미디엄',
  medium: '미디엄',
  medium_dark: '미디엄다크',
  dark: '다크',
} as const;

const getRoastingName = (roasting: keyof typeof ROASTING) => ROASTING[roasting];

const TYPE = {
  blend: '블랜드',
  single_origin: '싱글오리진',
  decaffeination: '디카페인',
} as const;

const getTypeName = (type: keyof typeof TYPE) => TYPE[type];
