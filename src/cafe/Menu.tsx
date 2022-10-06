import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { useLayoutEffect, useState } from 'react';
import { NextLinkComposed } from 'src/common/Link';
import { NORMAL } from 'src/utils/constants';
import { CAFE_PATH, MENU_PATH } from 'src/utils/routes';

import { getLabelWithColor, getTestType } from '../utils/combos';

function Menu(item: CafeMenuType) {
  const [isSmartMenu, setIsSmartMenu] = useState(false);

  useLayoutEffect(() => {
    const isSmart = getTestType() !== NORMAL;
    setIsSmartMenu(isSmart);
  }, []);

  return (
    <ListItem
      key={item.id}
      alignItems="flex-start"
      component={NextLinkComposed}
      to={`${CAFE_PATH}/${item.cafeId}${MENU_PATH}/${item.id}`}
      sx={{ color: 'inherit' }}
    >
      {/* <IconButton sx={{ position: 'absolute', left: 0, zIndex: 100 }}>
        <FavoriteBorderIcon />
      </IconButton> */}
      <ListItemAvatar sx={{ marginRight: '1rem' }}>
        <Avatar
          alt={item.name}
          src={item.images?.['240x240'] || item.imageURL}
          sx={{ width: 104, height: 104 }}
          variant="rounded"
        />
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
