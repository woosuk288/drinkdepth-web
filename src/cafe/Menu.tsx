import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { useLayoutEffect, useState } from 'react';
import LazyImage from 'src/common/LazyImage';
import { NextLinkComposed } from 'src/common/Link';
import { getScrollYKey } from 'src/hooks/useScrollY';
import { COLOR_PRICE } from 'src/theme';
import { MASKABLE_ICON_PATH, NORMAL } from 'src/utils/constants';
import { CAFE_PATH, MENU_PATH } from 'src/utils/routes';

import { getLabelWithColor, getTestType } from '../utils/combos';

type MenuProps = {
  item: CafeMenuType;
  index: number;
};
function Menu({ item, index }: MenuProps) {
  const [isSmartMenu, setIsSmartMenu] = useState(false);

  useLayoutEffect(() => {
    const isSmart = getTestType() !== NORMAL;
    setIsSmartMenu(isSmart);
  }, []);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const key = getScrollYKey();
    sessionStorage.setItem(key, `${window.scrollY}`);

    isSmartMenu === false && e.preventDefault();
  };

  return (
    <ListItem
      key={item.id}
      alignItems="flex-start"
      component={NextLinkComposed}
      to={`${CAFE_PATH}/${item.cafeId}${MENU_PATH}/${item.id}`}
      onClick={handleItemClick}
      sx={{ color: 'inherit' }}
    >
      {/* <IconButton sx={{ position: 'absolute', left: 0, zIndex: 100 }}>
        <FavoriteBorderIcon />
      </IconButton> */}
      <ListItemAvatar sx={{ marginRight: '1rem' }}>
        {index < 6 ? (
          <Avatar
            src={item.images?.['240x240'] || MASKABLE_ICON_PATH}
            alt={item.name}
            sx={{ width: 104, height: 104, bgcolor: 'white' }}
            variant="rounded"
          />
        ) : (
          <Avatar
            sx={{ width: 104, height: 104, bgcolor: 'white' }}
            variant="rounded"
          >
            <LazyImage
              src={item.images?.['240x240'] || MASKABLE_ICON_PATH}
              alt={item.name}
              options={{ rootMargin: '200px' }}
            />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText>
        <Typography fontWeight={'bold'} gutterBottom>
          {item.name}
        </Typography>
        <Typography noWrap variant="body2" gutterBottom>
          {isSmartMenu && item.description}
        </Typography>

        <Typography
          sx={{
            display: 'block',
            '> span ': {
              marginRight: '2px',
              color: '#fff',
              padding: '2px',
              borderRadius: '2px',
            },
          }}
          component="span"
          variant="body2"
          // color="text.primary"
          // color="inherit"
          fontWeight="bold"
          gutterBottom
        >
          {isSmartMenu &&
            item.labels.map((label) => (
              <span
                key={label}
                style={{
                  backgroundColor: getLabelWithColor(label).color,
                }}
              >
                {label}
              </span>
            ))}
        </Typography>

        <Typography
          variant="subtitle2"
          fontWeight={'bold'}
          sx={{ color: COLOR_PRICE }}
        >
          {item.price.toLocaleString()}원
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
export default Menu;
