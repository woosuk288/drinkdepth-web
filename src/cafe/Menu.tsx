import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
// import { updateImages } from 'src/utils/firebase/services';
import { getLabelWithColor, getTestType } from '../utils/combos';

function Menu(item: CafeMenuType) {
  const router = useRouter();

  const [isSmartMenu, setIsSmartMenu] = useState(false);

  useLayoutEffect(() => {
    const isSmart = getTestType() === 'smart';
    setIsSmartMenu(isSmart);
  }, []);

  const handleClick = () => {
    // const path = `cafes/${item.cafeId}/menus/${item.id}`;
    // const prefix = 'images/menus/babacarmel/';
    // const filename = '';
    // const suffix = '.jpg';
    // updateImages(path, prefix, filename, suffix);

    router.push({
      pathname: `${router.asPath}/menu/${item.id}`,
    });
  };

  return (
    <ListItem key={item.id} alignItems="flex-start" onClick={handleClick}>
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
