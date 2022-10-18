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
import { NORMAL, SCROLL_Y } from 'src/utils/constants';
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

  const handleItemClick = () => {
    console.log('handleItemClick : ', window.scrollY);
    sessionStorage.setItem(SCROLL_Y, `${window.scrollY}`);
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
            src={item.images?.['240x240'] || item.imageURL}
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
              src={item.images?.['240x240'] || item.imageURL}
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

        <Typography variant="subtitle2" sx={{ color: 'red' }}>
          {item.price.toLocaleString()}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
export default Menu;
